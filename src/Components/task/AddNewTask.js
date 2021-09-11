import React, { useContext, useState, useEffect } from "react";
import HomeContext from "../../Context/HomeContext";

import TaskCard from "./TaskCard";

import { v4 as uuidv4 } from "uuid";

import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import { Button, TextField, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-around",
    },
    button: {
      fontSize: "0.7rem",
      //mobile version
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.6rem",
      },
    },
    addContainer: {
      padding: "0 2rem",
    },
    workspaceName: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      marginBottom: "1rem",
      color: "#484848",
      "& h2": {
        //mobile version
        [theme.breakpoints.down("sm")]: {
          fontSize: "20px",
        },
      },
    },
    addNameandButton: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    addButton: {
      //mobile version
      [theme.breakpoints.down("sm")]: {
        width: "40px",
        height: "15px",
      },
    },
  })
);

const OrangeButton = withStyles({
  root: {
    backgroundColor: orange[900],
    color: "white",
    "&:hover": {
      backgroundColor: orange[900],
      color: "white",
    },
  },
})((props) => <Button {...props} />);

const OrangeFab = withStyles({
  root: {
    backgroundColor: orange[900],
    color: "white",
    "&:hover": {
      backgroundColor: orange[900],
      color: "white",
    },
  },
})((props) => <Fab {...props} />);

const OrangeTextField = withStyles({
  root: {
    "& .MuiInput-underline:after": {
      borderBottomColor: orange[900],
    },
  },
})((props) => <TextField {...props} />);

const AddNewTask = ({ checkKey, setConfetti, setOpen }) => {
  const classes = useStyles();
  const homeCtx = useContext(HomeContext);

  const [error, setError] = useState(false);

  // when task cards changed, set card's info to local strage
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(homeCtx.storeTaskData));
  }, [homeCtx.storeTaskData]);

  const createTask = () => {
    //if text in the input is empty, show error message
    if (homeCtx.taskText.trim() === "") {
      setError(true);
      return;
    }

    //if text in the input is not empty, store task with context API
    if (homeCtx.taskText.trim() !== "") {
      homeCtx.dispatchHome({
        type: "STORE_TASK",
        payload: {
          id: uuidv4(),
          task: homeCtx.taskText,
          isDone: false,
          isKey: false,
        },
      });

      homeCtx.dispatchHome({
        type: "TASK_TEXT",
        payload: "",
      });
    }
  };

  return (
    <>
      <div className={classes.addContainer}>
        <div className={classes.addNameandButton}>
          <div className={classes.workspaceName}>
            <h2>CREATE YOUR TASK</h2>
          </div>
          <div>
            {homeCtx.storeTaskData.length === 0 ? (
              <Button disabled variant="contained" className={classes.button}>
                {" "}
                Delete this workplace
              </Button>
            ) : (
              <OrangeButton
                variant="contained"
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
            e.key === "Enter" && !homeCtx.isEditing && createTask();
          }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <OrangeFab
            size="small"
            aria-label="add"
            className={classes.addButton}
            onClick={!homeCtx.isEditing && createTask}
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
              placeholder="ADD NEW TASK HERE"
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
            //if there is a task card, and key is not checked, show task card which is not done and key is not checkd
            //if there is a task card, and key is checked, show task card which is not done and key is checked.
            homeCtx.storeTaskData && !checkKey
              ? homeCtx.storeTaskData.filter((item) => !item.isDone)
              : homeCtx.keyTaskPage
              ? homeCtx.storeTaskData.filter(
                  (item) => !item.isDone && item.isKey
                )
              : ""
          }
          setConfetti={setConfetti}
          setOpen={setOpen}
        />
      </div>
    </>
  );
};

export default AddNewTask;
