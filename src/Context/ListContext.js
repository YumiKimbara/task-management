import { List } from "@material-ui/core";
import React, { useReducer, useContext } from "react";
import ListReducer from "../Reducer/ListReducer";

const ListContext = React.createContext();

export const ListContextProvider = (props) => {
  const initialState = {
    addTask: false,
    deleteTask: false,
    storeTaskData: [],
    taskText: "",
    leftTaskData: [],
    doneTaskData: [],
    keyTaskPage: false,
  };

  const [state, dispatchList] = useReducer(ListReducer, initialState);

  return (
    <ListContext.Provider
      value={{
        addTask: state.addTask,
        deleteTask: state.deleteTask,
        storeTaskData: state.storeTaskData,
        leftTaskData: state.leftTaskData,
        doneTaskData: state.doneTaskData,
        taskText: state.taskText,
        keyTaskPage: state.keyTaskPage,
        dispatchList: dispatchList,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListContext;
