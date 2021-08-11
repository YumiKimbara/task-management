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
    // minWidth: 275,
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

const TaskCard = ({ keyHandler, cardData }) => {
  const classes = useStyles();
  const homeCtx = useContext(HomeContext);

  const [key, setKey] = useState("");

  // const changeToDone = (id, task, e) => {
  //   console.log(id, task);
  //   console.log(listCtx.storeTaskData);
  //   const taskLeft = listCtx.storeTaskData.filter((cardInfo) => {
  //     return cardInfo.id !== id;
  //   });

  //   console.log(taskLeft);
  //   taskLeft.map((data) => {
  //     listCtx.dispatchList({
  //       type: "LEFT_TASK",
  //       payload: {
  //         taskLeft,
  //       },
  //     });
  //     console.log(listCtx.leftTaskData);
  //   });

  //   if (e.target.checked === true) {
  //     listCtx.dispatchList({
  //       type: "DONE_TASK",
  //       payload: {
  //         id: id,
  //         task: task,
  //       },
  //     });
  //   }
  //   console.log(e.target.value);
  //   console.log(listCtx.leftTaskData);
  //   console.log(listCtx.doneTaskData);
  // };

  const changeToDone = (data, e) => {
    homeCtx.dispatchHome({
      type: "DONE_TASK",
      payload: data,
    });

    // console.log(id, task);
    // console.log(listCtx.storeTaskData);
    // const taskLeft = listCtx.storeTaskData.filter((cardInfo) => {
    //   return cardInfo.id !== id;
    // });

    // console.log(taskLeft);
    // taskLeft.map((data) => {
    //   listCtx.dispatchList({
    //     type: "LEFT_TASK",
    //     payload: {
    //       taskLeft,
    //     },
    //   });
    //   console.log(listCtx.leftTaskData);
    // });

    // if (e.target.checked === true) {
    //   listCtx.dispatchList({
    //     type: "DONE_TASK",
    //     payload: {
    //       id: id,
    //       task: task,
    //     },
    //   });
    // }
    // console.log(e.target.value);
    // console.log(listCtx.leftTaskData);
    // console.log(listCtx.doneTaskData);
  };
  const changeToUnDone = (data, e) => {
    homeCtx.dispatchHome({
      type: "UNDONE_TASK",
      payload: data,
    });
  };

  const changeToKeyTask = (data, e) => {
    if (e.target.checked) {
      homeCtx.dispatchHome({
        type: "KEY_TASK",
        payload: data,
      });
    }
  };

  const deleteTask = (data) => {
    console.log(data.id);
    // console.log(
    //   listCtx.storeTaskData.filter((data) => {
    //     console.log(data.id);
    //   })
    // );

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
            <div className={classes.root} key={data.id}>
              <Card className={classes.root}>
                <CardContent>
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
                      // changeToDone(data.id, data.task, e);
                      e.target.checked
                        ? changeToDone(data, e)
                        : changeToUnDone(data, e);
                    }}
                  />
                  <label htmlFor="task">{data.task}</label>
                </CardContent>
                <CardActions>
                  {data.isDone && (
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
                  <FormControlLabel
                    control={
                      <Checkbox
                        onClick={(e) => {
                          console.log(e.target.checked);
                          setKey(e.target.checked);
                          keyHandler(key);
                        }}
                        icon={
                          data.isDone && !data.isKey ? (
                            <StarBorderRoundedIcon />
                          ) : !data.isDone && !data.isKey ? (
                            <StarBorderRoundedIcon />
                          ) : data.isKey ? (
                            <StarRoundedIcon style={{ color: "#fdc500" }} />
                          ) : (
                            ""
                          )
                        }
                        checkedIcon={
                          <StarRoundedIcon style={{ color: "#fdc500" }} />
                        }
                        name="checkedH"
                      />
                    }
                  />
                </CardActions>
              </Card>
            </div>
          );
        })}
    </>
  );
};

export default TaskCard;
