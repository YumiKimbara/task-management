import React, { useState, useContext } from "react";
import AddNewTask from "../task/AddNewTask";
import KeyTask from "../task/KeyTask";
import TaskDone from "../task/TaskDone";
import Confetti from "../layout/Confetti";

import HomeContext from "../../Context/HomeContext";

const Home = ({ checkKey }) => {
  const [confetti, setConfetti] = useState(false);

  console.log(confetti);

  const changeConfettiStatus = () => {
    setConfetti(false);
    return () => {
      <Confetti />;
    };
  };

  return (
    <>
      {checkKey ? (
        ""
      ) : (
        <AddNewTask checkKey={checkKey} setConfetti={setConfetti} />
      )}
      {checkKey ? (
        <KeyTask checkKey={checkKey} />
      ) : (
        <TaskDone setConfetti={setConfetti} />
      )}
      {confetti && <Confetti setConfetti={setConfetti} />}
    </>
  );
};

export default Home;
