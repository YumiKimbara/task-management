import React, { useState, useContext } from "react";
import AddNewTask from "../task/AddNewTask";
import KeyTask from "../task/KeyTask";
import TaskDone from "../task/TaskDone";
import Confetti from "../layout/Confetti";

import { Modal, Backdrop } from "@material-ui/core";

import HomeContext from "../../Context/HomeContext";
import { mergeClasses } from "@material-ui/styles";

import classes from "./Home.module.css";

const Home = ({ checkKey }) => {
  const [open, setOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  console.log(confetti);

  return (
    <>
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
        <p className={classes.modal}>Congrats🥳 You completed all task(s)</p>
      </Modal>
      {confetti && <Confetti setConfetti={setConfetti} />}
    </>
  );
};

export default Home;
