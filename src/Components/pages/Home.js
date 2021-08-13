import React, { useContext } from "react";
import AddNewTask from "../task/AddNewTask";
import KeyTask from "../task/KeyTask";
import TaskDone from "../task/TaskDone";
import HomeContext from "../../Context/HomeContext";

const Home = ({ checkKey }) => {
  const homeCtx = useContext(HomeContext);

  return (
    <>
      {checkKey ? "" : <AddNewTask checkKey={checkKey} />}
      {checkKey ? <KeyTask checkKey={checkKey} /> : <TaskDone />}
    </>
  );
};

export default Home;
