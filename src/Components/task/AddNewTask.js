import React, { useContext, useState, useEffect } from "react";
import HomeContext from "../../Context/HomeContext";
import { v4 as uuidv4 } from "uuid";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import TaskCard from "./TaskCard";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-around",
    },
    button: {
      fontSize: "0.7rem",
    },
    textFieldContainer: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    workspaceName: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    addNameandButton: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
);

const OrangeButton = withStyles({
  root: {
    backgroundColor: orange[800],
    color: "white",
    "&:hover": {
      backgroundColor: orange[800],
      color: "white",
    },
  },
})((props) => <Button color="default" {...props} />);

const OrangeFab = withStyles({
  root: {
    backgroundColor: orange[800],
    color: "white",
    "&:hover": {
      backgroundColor: orange[800],
      color: "white",
    },
  },
})((props) => <Fab color="default" {...props} />);

const OrangeTextField = withStyles({
  root: {
    "& .MuiInput-underline:after": {
      borderBottomColor: orange[800],
    },
  },
})((props) => <TextField color="default" {...props} />);

const AddNewTask = ({ checkKey }) => {
  const classes = useStyles();
  const homeCtx = useContext(HomeContext);

  const [error, setError] = useState(false);

  // useEffect(() => {
  //   localStorage.setItem("task", JSON.stringify(listCtx.storeTaskData));
  // }, [listCtx.storeTaskData]);

  const createTask = () => {
    if (homeCtx.taskText.trim() === "") {
      setError(true);
      return;
    }

    if (homeCtx.taskText.trim() !== "") {
      homeCtx.dispatchHome({
        type: "STORE_TASK",
        payload: {
          id: uuidv4(),
          task: homeCtx.taskText,
          isDone: false,
        },
      });

      homeCtx.dispatchHome({
        type: "TASK_TEXT",
        payload: "",
      });
      console.log(homeCtx.storeTaskData);
    }

    // if (listCtx.taskText.trim() !== "" && listCtx.keyTaskPage) {
    //   // listCtx.dispatchList({
    //   //   type: "KEY_TASK",
    //   //   payload: listCtx.storeTaskData,
    //   // });
    //   listCtx.dispatchList({
    //     type: "STORE_TASK",
    //     payload: {
    //       id: uuidv4(),
    //       task: listCtx.taskText,
    //       isDone: false,
    //       isKey: true,
    //     },
    //   });
    //   listCtx.dispatchList({
    //     type: "TASK_TEXT",
    //     payload: "",
    //   });
    //   console.log(listCtx.storeTaskData);
    // }
  };

  // const getTask = localStorage.getItem("task");
  // const jsonTask = JSON.parse(getTask);

  const primary = orange[500];
  return (
    <>
      <div className={classes.addNewTaskContainer}>
        <div className={classes.addNameandButton}>
          <div className={classes.workspaceName}>
            <h2>Create your task</h2>
          </div>
          <div>
            {homeCtx.storeTaskData.length === 0 ? (
              <Button
                disabled
                variant="contained"
                // color="primary"
                className={classes.button}
              >
                {" "}
                Delete this workplace
              </Button>
            ) : (
              <OrangeButton
                variant="contained"
                // color=`${primary}`
                className={classes.button}
                onClick={(e) => {
                  e.preventDefault();
                  homeCtx.dispatchHome({
                    type: "DELETE_ALL_TASK",
                    payload: "",
                  });
                }}
              >
                Delete this workplace
              </OrangeButton>
            )}
          </div>
        </div>
        <form
          className={classes.root}
          onKeyDown={(e) => {
            console.log(e.key);
            e.key === "Enter" && createTask();
          }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <OrangeFab
            size="small"
            aria-label="add"
            className={classes.margin}
            onClick={createTask}
          >
            <AddIcon />
          </OrangeFab>
          {error ? (
            <TextField
              error
              fullWidth
              helperText="Type your task"
              value={homeCtx.taskText}
              onChange={(e) => {
                setError(false);
                homeCtx.dispatchHome({
                  type: "TASK_TEXT",
                  payload: e.target.value,
                });
              }}
            />
          ) : (
            <OrangeTextField
              style={{ margin: 8 }}
              placeholder="Add new task here"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={homeCtx.taskText}
              onChange={(e) => {
                homeCtx.dispatchHome({
                  type: "TASK_TEXT",
                  payload: e.target.value,
                });
              }}
            />
          )}
        </form>
      </div>
      <div className={classes.card}>
        <TaskCard
          cardData={
            homeCtx.storeTaskData && !checkKey
              ? homeCtx.storeTaskData.filter((item) => !item.isDone)
              : homeCtx.keyTaskPage
              ? homeCtx.storeTaskData.filter(
                  (item) => !item.isDone && item.isKey
                )
              : ""
          }
        />
      </div>
    </>
  );
};

export default AddNewTask;
