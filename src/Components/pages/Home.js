import React, { useState, useContext } from "react";
import AddNewTask from "../task/AddNewTask";
import KeyTask from "../task/KeyTask";
import TaskDone from "../task/TaskDone";
import Confetti from "../layout/Confetti";

import HomeContext from "../../Context/HomeContext";

const Home = ({ checkKey }) => {
  const [sample, setSample] = useState(false);

  console.log(sample);

  const changeConfettiStatus = () => {
    setSample(false);
    return () => {
      <Confetti />;
    };
  };

  return (
    <>
      {checkKey ? "" : <AddNewTask checkKey={checkKey} setSample={setSample} />}
      {checkKey ? (
        <KeyTask checkKey={checkKey} />
      ) : (
        <TaskDone setSample={setSample} />
      )}
      {sample && <Confetti setSample={setSample} />}
    </>
  );
};

export default Home;
