import { Home } from "@material-ui/core";
import React, { useReducer } from "react";
import HomeReducer from "../Reducer/HomeReducer";

const HomeContext = React.createContext();

export const HomeContextProvider = (props) => {
  const storedTask = localStorage.getItem("task");
  const jsonTask = JSON.parse(storedTask);

  const initialState = {
    addTask: false,
    deleteTask: false,
    storeTaskData: jsonTask ? jsonTask : [],
    taskText: "",
    leftTaskData: [],
    doneTaskData: [],
    keyTaskPage: false,
    checkConfetti: false,
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
        checkConfetti: state.checkConfetti,
        dispatchHome: dispatchHome,
      }}
    >
      {props.children}
    </HomeContext.Provider>
  );
};

export default HomeContext;
