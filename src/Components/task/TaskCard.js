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
      width: "100%",
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
    labelWrapper: {
      wwidth: "100%",
    },
    input: {
      padding: "0.5rem",
      width: "90%",
      //mobile version
      [theme.breakpoints.down("md")]: {
        width: "85%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "80%",
      },
      "&:focus": {
        outline: "none",
      },
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
  const [editText, setEditText] = useState();
  const [editId, setEditId] = useState();
  const [editing, setEditing] = useState("");
  const [notEditing, setNotEditing] = useState("");

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

  const editTask = (data) => {
    if (!editText) return;

    homeCtx.dispatchHome({
      type: "EDIT_TASK",
      payload: { data: { ...data, task: editText } },
    });
  };

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

  const showEditButton = (data) => {
    homeCtx.dispatchHome({
      type: "SHOW_EDIT",
      payload: data,
    });
  };

  const hideEditButton = (data) => {
    homeCtx.dispatchHome({
      type: "HIDE_EDIT",
      payload: data,
    });
  };

  const checkEditing = (id) => {
    const unClikedEditButton = cardData.filter((item) => {
      return item.id !== id;
    });
    const unClikedEditId = unClikedEditButton.map((item) => {
      return item.id;
    });

    setNotEditing(unClikedEditId);

    const clikedEditButton = cardData.filter((item) => {
      return item.id === id;
    });

    const clikedEditId = clikedEditButton.map((item) => {
      return item.id;
    });

    setEditing(clikedEditId);
  };

  return (
    <>
      {cardData &&
        cardData.map((data, i) => {
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
                  {changeEdit && cardData[i].id !== editId && (
                    <label htmlFor="task">{data.task}</label>
                  )}
                  {changeEdit && cardData[i].id === editId && (
                    <input
                      className={classes.input}
                      type="text"
                      value={data.id === editing.toString() && editText}
                      onChange={(e) => {
                        setEditText(e.target.value);
                        editTask(editText);
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
                          disabled={
                            notEditing.includes(cardData[i].id) &&
                            !data.toggleEdit
                              ? true
                              : false
                          }
                          onClick={(e) => {
                            setEditText(data.task);
                            checkEditing(data.id);
                            e.target.checked
                              ? hideEditButton(data)
                              : showEditButton(data);

                            setEditId(cardData[i].id);

                            editTask(data);
                            setChangeEdit(!changeEdit);

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
                        changeToKeyTask(data, true);
                      }}
                    />
                  ) : (
                    <StarRoundedIcon
                      className={classes.StarRoundedIcon}
                      onClick={(e) => {
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
