import React, { useContext } from "react";
import AddNewTask from "../task/AddNewTask";
import KeyTask from "../task/KeyTask";
import TaskDone from "../task/TaskDone";
import ListContext from "../../Context/ListContext";

const List = ({ checkKey }) => {
  const listCtx = useContext(ListContext);

  return (
    <>
      {console.log(checkKey)}
      <AddNewTask checkKey={checkKey} />
      {checkKey ? <KeyTask /> : <TaskDone />}
    </>
  );
};

export default List;
