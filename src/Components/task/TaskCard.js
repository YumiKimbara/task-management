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
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    margin: "0.5rem",
  },
  // bullet: {
  //   display: "inline-block",
  //   margin: "0 2px",
  //   transform: "scale(0.8)",
  // },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const TaskCard = () => {
  const classes = useStyles();
  const listCtx = useContext(ListContext);

  console.log(listCtx.storeTaskData);

  return (
    <>
      {listCtx.storeTaskData &&
        listCtx.storeTaskData.map((data, i) => {
          return (
            <div className={classes.root}>
              <Card className={classes.root}>
                <CardContent>
                  <FormControlLabel
                    control={<Checkbox name="checkedB" color="primary" />}
                    type="checkbox"
                    id="task"
                    name="task"
                    onClick={() => {
                      const taskLeft = listCtx.storeTaskData.filter((data) => {
                        return data.id !== listCtx.storeTaskData[i].id;
                      });
                      const taskDone = listCtx.storeTaskData.filter((data) => {
                        return data.id === listCtx.storeTaskData[i].id;
                      });

                      const task1 = taskLeft.map((data) => {
                        return data.task;
                      });
                      const id1 = taskLeft.map((data) => {
                        return data.id;
                      });

                      const task2 = taskDone.map((data) => {
                        return data.task;
                      });
                      const id2 = taskDone.map((data) => {
                        return data.id;
                      });

                      listCtx.dispatchList({
                        type: "LEFT_TASK",
                        payload: {
                          id: { ...id1, id1 },
                          task: { ...task1, task1 },
                        },
                      });

                      listCtx.dispatchList({
                        type: "DONE_TASK",
                        payload: {
                          id: { ...id2, id2 },
                          task: { ...task2, task2 },
                        },
                      });

                      console.log(
                        `taskLeft: ${JSON.stringify(
                          taskLeft
                        )}, taskDone: ${JSON.stringify(taskDone)}`
                      );
                      console.log(
                        `left: ${JSON.stringify(
                          listCtx.leftTaskData
                        )}, done: ${JSON.stringify(listCtx.doneTaskData)}`
                      );
                    }}
                  />
                  <label htmlFor="task">{data.task}</label>
                </CardContent>
                <CardActions>
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<StarBorderRoundedIcon />}
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

// {listCtx.storeTaskData &&
//   listCtx.storeTaskData.map((data, i) => {
//     return (
//       <div className={classes.cardContainer}>
//         <input
//           type="checkbox"
//           id="task"
//           name="task"
//           onClick={() => {
//             const taskLeft = listCtx.storeTaskData.filter(
//               (data) => {
//                 return data.id !== listCtx.storeTaskData[i].id;
//               }
//             );
//             const taskDone = listCtx.storeTaskData.filter(
//               (data) => {
//                 return data.id === listCtx.storeTaskData[i].id;
//               }
//             );

//             const task1 = taskLeft.map((data) => {
//               return data.task;
//             });
//             const id1 = taskLeft.map((data) => {
//               return data.id;
//             });

//             const task2 = taskDone.map((data) => {
//               return data.task;
//             });
//             const id2 = taskDone.map((data) => {
//               return data.id;
//             });

//             listCtx.dispatchList({
//               type: "LEFT_TASK",
//               payload: {
//                 id: { ...id1, id1 },
//                 task: { ...task1, task1 },
//               },
//             });

//             listCtx.dispatchList({
//               type: "DONE_TASK",
//               payload: {
//                 id: { ...id2, id2 },
//                 task: { ...task2, task2 },
//               },
//             });

//             console.log(
//               `taskLeft: ${JSON.stringify(
//                 taskLeft
//               )}, taskDone: ${JSON.stringify(taskDone)}`
//             );
//             console.log(
//               `left: ${JSON.stringify(
//                 listCtx.leftTaskData
//               )}, done: ${JSON.stringify(listCtx.doneTaskData)}`
//             );
//           }}
//         />
//         <label htmlFor="task">{data.task}</label>
//       </div>
//     );
//   })}
