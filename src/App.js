import React, { useState } from "react";
import Header from "./Components/layout/Header";
import Home from "./Components/pages/Home";
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
        <Home checkKey={checkKey} />
      </div>
    </>
  );
};

export default App;
