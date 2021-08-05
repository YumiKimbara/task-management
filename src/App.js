import React, { useState } from "react";
import Header from "./Components/layout/Header";
import List from "./Components/pages/List";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    sample: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "1rem",
      marginLeft: "5rem",
      marginRight: "5rem",
      flexDirection: "column",
    },
  })
);

const App = () => {
  const [checkKey, setCheckKey] = useState(false);
  const classes = useStyles();

  return (
    <>
      <Header checkKey={checkKey} setCheckKey={setCheckKey} />
      <div className={classes.sample}>
        <List heckKey={checkKey} />
      </div>
    </>
  );
};

export default App;
