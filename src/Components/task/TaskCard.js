import React, { useContext } from "react";
import classes from "./Card.module.scss";
import ListContext from "../../Context/ListContext";
import { v4 as uuidv4 } from "uuid";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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

const TaskCard = ({ cardData }) => {
  const classes = useStyles();
  const listCtx = useContext(ListContext);

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
    listCtx.dispatchList({
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
    listCtx.dispatchList({
      type: "UNDONE_TASK",
      payload: data,
    });
  };

  const changeToKeyTask = (data, e) => {
    if (e.target.checked) {
      listCtx.dispatchList({
        type: "KEY_TASK",
        payload: data,
      });
      console.log(listCtx.storeTaskData);
    }
  };

  const deleteTask = (data) => {
    console.log(data.id);
    // console.log(
    //   listCtx.storeTaskData.filter((data) => {
    //     console.log(data.id);
    //   })
    // );

    listCtx.dispatchList({
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
                      <Checkbox
                        checked={data.isDone ? true : false}
                        name="checkedB"
                        color="primary"
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
                  <FormControlLabel
                    control={
                      <Checkbox
                        onClick={(e) => {
                          data.isDone && deleteTask(data);
                          changeToKeyTask(data, e);
                        }}
                        icon={
                          data.isDone && !data.isKey ? (
                            <DeleteIcon />
                          ) : !data.isDone && !data.isKey ? (
                            <StarBorderRoundedIcon />
                          ) : data.isKey ? (
                            <StarRoundedIcon style={{ color: "#fdc500" }} />
                          ) : (
                            ""
                          )
                        }
                        checkedIcon={
                          data.isDone ? (
                            <DeleteIcon
                              style={{ color: "rgba(0, 0, 0, 0.54)" }}
                            />
                          ) : (
                            <StarRoundedIcon style={{ color: "#fdc500" }} />
                          )
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
