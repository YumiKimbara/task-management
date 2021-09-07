import React, { useState } from "react";

import AddNewTask from "../task/AddNewTask";
import KeyTask from "../task/KeyTask";
import TaskDone from "../task/TaskDone";
import Confetti from "../layout/Confetti";

import { Modal, Button } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) =>
  createStyles({
    modalContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modal: {
      width: "30vw",
      height: "30vh",
      padding: "2rem",
      backgroundColor: "#f0efeb",
      zIndex: "2",
      borderRadius: "10px",
      textAlign: "center",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      opacity: "0.8",
      //mobile version
      [theme.breakpoints.down("md")]: {
        height: "25vh",
      },
      [theme.breakpoints.down("sm")]: {
        height: "20vh",
      },
    },
    msg: {
      fontSize: "1.4rem",
      margin: "0",
      //mobile version
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
    button: {
      background: orange[900],
      color: "white",
      fontWeight: "bold",
      position: "absolute",
      bottom: "30%",
      left: "50%",
      transform: "translateY(150%) translateX(-50%)",
      margin: "auto",
      "&:hover": {
        backgroundColor: orange[900],
      },
      //mobile version
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.5rem",
      },
    },
  })
);

const Home = ({ checkKey }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {confetti && <Confetti setConfetti={setConfetti} />}

      {checkKey ? (
        ""
      ) : (
        <AddNewTask
          checkKey={checkKey}
          setConfetti={setConfetti}
          setOpen={setOpen}
        />
      )}
      {checkKey ? (
        <KeyTask checkKey={checkKey} />
      ) : (
        <TaskDone setConfetti={setConfetti} setOpen={setOpen} />
      )}
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modalContainer}
      >
        <div className={classes.modal}>
          <p className={classes.msg}>Congrats🥳</p>
          <p className={classes.msg}>You completed all task(s)</p>
          <Button
            className={classes.button}
            variant="contained"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Home;
