import React from "react";
import classes from "./CreateWorkspace.module.scss";
//import { Link } from "react-router-dom";

const CreateWorkspace = () => {
  return (
    <>
      <div className={classes.createWorkspaceContainer}>
        <h2>Create Workspace</h2>
        <div className={classes.createWorkspace}></div>
      </div>
    </>
  );
};

export default CreateWorkspace;
