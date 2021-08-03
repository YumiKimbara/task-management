import React, { useContext } from "react";
import AddNewTask from "../task/AddNewTask";
import KeyTask from "../task/KeyTask";
import TaskDone from "../task/TaskDone";
import ListContext from "../../Context/ListContext";

const List = () => {
  const listCtx = useContext(ListContext);

  return (
    <>
      {console.log(listCtx.keyTaskPage)}
      <AddNewTask />
      {listCtx.keyTaskPage === true ? <KeyTask /> : <TaskDone />}
    </>
  );
};

export default List;
