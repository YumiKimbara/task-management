import { Home } from "@material-ui/core";
import React, { useReducer, useContext } from "react";
import HomeReducer from "../Reducer/HomeReducer";

const HomeContext = React.createContext();

export const HomeContextProvider = (props) => {
  const initialState = {
    addTask: false,
    deleteTask: false,
    storeTaskData: [],
    taskText: "",
    leftTaskData: [],
    doneTaskData: [],
    keyTaskPage: false,
  };

  const [state, dispatchHome] = useReducer(HomeReducer, initialState);

  return (
    <HomeContext.Provider
      value={{
        addTask: state.addTask,
        deleteTask: state.deleteTask,
        storeTaskData: state.storeTaskData,
        leftTaskData: state.leftTaskData,
        doneTaskData: state.doneTaskData,
        taskText: state.taskText,
        keyTaskPage: state.keyTaskPage,
        dispatchHome: dispatchHome,
      }}
    >
      {props.children}
    </HomeContext.Provider>
  );
};

export default HomeContext;
