import React, { useContext, useState } from "react";
import HomeContext from "../../Context/HomeContext";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    margin: "0.5rem",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardWords: {
    wordBreak: "break-word",
  },
});

const OrangeCheckbox = withStyles({
  root: {
    color: orange[700],
    "&$checked": {
      color: orange[900],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const TaskCard = ({ cardData, checkKey }) => {
  const classes = useStyles();
  const homeCtx = useContext(HomeContext);

  const changeToDone = (data, e) => {
    homeCtx.dispatchHome({
      type: "DONE_TASK",
      payload: data,
    });
  };
  const changeToUnDone = (data, e) => {
    homeCtx.dispatchHome({
      type: "UNDONE_TASK",
      payload: data,
    });
  };

  const changeToKeyTask = (data, isKeyTrue) => {
    console.log(isKeyTrue);
    // if (e.target.checked) {
    homeCtx.dispatchHome({
      type: "KEY_TASK",
      payload: { data: data, key: isKeyTrue },
    });
    console.log(homeCtx.storeTaskData);

    // }
  };

  const deleteTask = (data) => {
    homeCtx.dispatchHome({
      type: "DELETE_TASK",
      payload: data,
    });
  };

  return (
    <>
      {cardData &&
        cardData.map((data, i) => {
          return (
            //keyはiではなく、idなどuniqueなものを使う。
            <div className={classes.root} key={data.id}>
              <Card className={classes.root}>
                <CardContent className={classes.cardWords}>
                  {!checkKey && (
                    <FormControlLabel
                      control={
                        //checkされているかどうかをisDone使って切り分ける。
                        <OrangeCheckbox
                          checked={data.isDone ? true : false}
                          name="checkedB"
                          id={data.id}
                        />
                      }
                      type="checkbox"
                      id="task"
                      name="task"
                      onClick={(e) => {
                        e.target.checked
                          ? changeToDone(data, e)
                          : changeToUnDone(data, e);
                      }}
                    />
                  )}
                  <label htmlFor="task">{data.task}</label>
                </CardContent>
                <CardActions>
                  {data.isDone && !checkKey && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onClick={(e) => {
                            data.isDone && deleteTask(data);
                          }}
                          icon={<DeleteIcon />}
                          name="checkedH"
                          color=""
                        />
                      }
                    />
                  )}
                  {!data.isKey ? (
                    <StarBorderRoundedIcon
                      onClick={(e) => {
                        console.log(e.target.checked);
                        changeToKeyTask(data, true);
                      }}
                    />
                  ) : (
                    <StarRoundedIcon
                      style={{ color: "#fdc500" }}
                      onClick={(e) => {
                        console.log(e.target.checked);
                        changeToKeyTask(data, false);
                      }}
                    />
                  )}
                </CardActions>
              </Card>
            </div>
          );
        })}
    </>
  );
};

export default TaskCard;
