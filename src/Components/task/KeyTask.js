import React, { useContext } from "react";
import HomeContext from "../../Context/HomeContext";
import TaskCard from "./TaskCard";

const KeyTask = () => {
  const homeCtx = useContext(HomeContext);

  const keyHandler = (isKeyTask) => {
    console.log(isKeyTask);
  };

  return (
    <>
      <div>
        <h2>Key Task Done</h2>
        {/* <TaskCard cardData={listCtx.doneTaskData} /> */}
        <TaskCard
          keyHandler={keyHandler}
          cardData={
            homeCtx.storeTaskData &&
            homeCtx.storeTaskData.filter((item) => item.isKey)
          }
        />
      </div>
    </>
  );
};

export default KeyTask;
