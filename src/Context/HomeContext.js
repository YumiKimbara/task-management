import React, { useReducer } from "react";
import HomeReducer from "../Reducer/HomeReducer";

const HomeContext = React.createContext();

export const HomeContextProvider = (props) => {
  const storedTask = localStorage.getItem("task");
  const jsonTask = JSON.parse(storedTask);

  const initialState = {
    //if task is stored in the local strage, show them
    storeTaskData: jsonTask ? jsonTask : [],
    taskText: "",
    keyTaskPage: false,
    checkConfetti: false,
    isEditing: false,
  };

  const [state, dispatchHome] = useReducer(HomeReducer, initialState);

  return (
    <HomeContext.Provider
      value={{
        storeTaskData: state.storeTaskData,
        taskText: state.taskText,
        keyTaskPage: state.keyTaskPage,
        checkConfetti: state.checkConfetti,
        isEditing: state.isEditing,
        dispatchHome: dispatchHome,
      }}
    >
      {props.children}
    </HomeContext.Provider>
  );
};

export default HomeContext;
