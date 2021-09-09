import React, { useState, useContext } from "react";
import HomeContext from "../../Context/HomeContext";

import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import {
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import { v4 as uuidv4 } from "uuid";

import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const useStyles = makeStyles((theme) =>
  createStyles({
    cardContainer: {
      display: "flex",
      justifyContent: "center",
      margin: "1rem 0",
    },
    root: {
      width: "90%",
      display: "flex",
      justifyContent: "space-between",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    cardWords: {
      wordBreak: "break-word",
      //mobile version
      [theme.breakpoints.down("sm")]: {
        padding: "8px",
      },
    },
    StarBorderRoundedIcon: {
      cursor: "pointer",
      color: "rgba(0, 0, 0, 0.54)",
    },
    StarRoundedIcon: {
      cursor: "pointer",
      color: "#ffb703",
    },
    editIcon: {
      cursor: "pointer",
      color: "rgba(0, 0, 0, 0.54)",
    },
  })
);

const OrangeCheckbox = withStyles({
  root: {
    color: orange[700],
    "&$checked": {
      color: orange[900],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const TaskCard = ({ cardData, checkKey, setConfetti, setOpen }) => {
  const classes = useStyles();
  const homeCtx = useContext(HomeContext);
  const [changeEdit, setChangeEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState("");

  const changeToDone = (data) => {
    homeCtx.dispatchHome({
      type: "DONE_TASK",
      payload: data,
    });
  };
  const changeToUnDone = (data) => {
    homeCtx.dispatchHome({
      type: "UNDONE_TASK",
      payload: data,
    });
  };

  const changeToKeyTask = (data, isKeyTrue) => {
    homeCtx.dispatchHome({
      type: "KEY_TASK",
      payload: { data: data, key: isKeyTrue },
    });
  };

  const editTask = (data, isEditTrue) => {
    // if (editText === "") return;

    console.log("editText", editText);

    console.log("data", { ...data, task: editText });

    homeCtx.dispatchHome({
      type: "EDIT_TASK",
      payload: { data: { ...data, task: editText }, edit: isEditTrue },
    });
    // console.log(editId);
    setChangeEdit(!changeEdit);
    console.log("changeEdit", changeEdit);

    // homeCtx.dispatchHome({
    //   type: "STORE_TASK",
    //   payload: {
    //     id: uuidv4(),
    //     // task: homeCtx.taskText,
    //     task: editText,
    //     isDone: false,
    //     isKey: false,
    //   },
    // });
  };
  console.log("storeTaskData", homeCtx.storeTaskData);

  const deleteTask = (data) => {
    homeCtx.dispatchHome({
      type: "DELETE_TASK",
      payload: data,
    });

    if (homeCtx.storeTaskData.length === 1) {
      setConfetti(true);
      setOpen(true);
    }
  };

  return (
    <>
      {cardData &&
        cardData.map((data, i) => {
          console.log("cardData", cardData);

          //carddata[i] === clicked id then edit the text
          return (
            <div className={classes.cardContainer} key={data.id}>
              <Card className={classes.root}>
                <CardContent className={classes.cardWords}>
                  {!checkKey && (
                    <FormControlLabel
                      control={
                        //if task is done, check the checkbox
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
                  {!changeEdit && <label htmlFor="task">{data.task}</label>}

                  {changeEdit && cardData[i].id === editId && (
                    <input
                      id="editText"
                      type="text"
                      value={editText}
                      onChange={(e) => {
                        if (cardData[i]) {
                          setEditText(e.target.value);
                        }

                        console.log("editText", editText);
                        //setError(false);
                        // homeCtx.dispatchHome({
                        //   type: "TASK_TEXT",
                        //   payload: e.target.value,
                        // });
                        // console.log("data.task", homeCtx.taskText);
                        // if (homeCtx.taskText.trim() !== "") {
                        //   homeCtx.dispatchHome({
                        //     type: "STORE_TASK",
                        //     payload: {
                        //       id: uuidv4(),
                        //       task: homeCtx.taskText,
                        //       isDone: false,
                        //       isKey: false,
                        //     },
                        //   });
                        // }
                      }}
                    />
                  )}
                </CardContent>
                <CardActions>
                  {data.isDone && !checkKey && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onClick={() => {
                            data.isDone && deleteTask(data, true);
                          }}
                          icon={<DeleteIcon />}
                        />
                      }
                    />
                  )}
                  {!data.isDone && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onClick={(e) => {
                            // if (e.target === cardData[i]) {
                            //   console.log("same card");
                            // }
                            // if (e.target.checked) {
                            setEditId(cardData[i].id);
                            editTask(data, true);
                            // }
                          }}
                          icon={<EditIcon />}
                          checkedIcon={<CheckCircleOutlineIcon />}
                        />
                      }
                    />
                  )}
                  {!data.isKey ? (
                    <StarBorderRoundedIcon
                      className={classes.StarBorderRoundedIcon}
                      onClick={(e) => {
                        console.log(e.target.checked);
                        changeToKeyTask(data, true);
                      }}
                    />
                  ) : (
                    <StarRoundedIcon
                      className={classes.StarRoundedIcon}
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
