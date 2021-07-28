import React, { useContext, useState } from "react";
import classes from "./AddNewTask.module.scss";
import ListContext from "../../Context/ListContext";
import { v4 as uuidv4 } from "uuid";
import { createStyles, makeStyles } from "@material-ui/core/styles";
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

const AddNewTask = () => {
  const classes = useStyles();
  const listCtx = useContext(ListContext);

  const [error, setError] = useState(false);

  const createTask = () => {
    if (listCtx.taskText.trim() === "") {
      setError(true);
      return;
    }

    if (listCtx.taskText.trim() !== "") {
      listCtx.dispatchList({
        type: "STORE_TASK",
        payload: {
          id: uuidv4(),
          task: listCtx.taskText,
        },
      });
      listCtx.dispatchList({
        type: "TASK_TEXT",
        payload: "",
      });
    }
  };

  console.log(listCtx.taskText);
  console.log(listCtx.storeTaskData);

  return (
    <>
      <div className={classes.addNewTaskContainer}>
        <div className={classes.addNameandButton}>
          <div className={classes.workspaceName}>
            <h2>Workspace:</h2>
            <TextField
              id="standard-full-width"
              style={{ margin: 8 }}
              placeholder="Type name of your workspace"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Delete this workplace
            </Button>
          </div>
        </div>
        <form className={classes.root}>
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            className={classes.margin}
            onClick={createTask}
          >
            <AddIcon />
          </Fab>
          {error ? (
            <TextField
              error
              id="standard-error-helper-text"
              fullWidth
              defaultValue="Hello World"
              helperText="Type your task"
              value={listCtx.taskText}
              onChange={(e) => {
                setError(false);
                listCtx.dispatchList({
                  type: "TASK_TEXT",
                  payload: e.target.value,
                });
              }}
            />
          ) : (
            <TextField
              id="standard-full-width"
              style={{ margin: 8 }}
              placeholder="Add new task here"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={listCtx.taskText}
              onChange={(e) => {
                listCtx.dispatchList({
                  type: "TASK_TEXT",
                  payload: e.target.value,
                });
              }}
            />
          )}
        </form>
      </div>
      <div className={classes.card}>
        <TaskCard />
      </div>
    </>
  );
};

export default AddNewTask;
