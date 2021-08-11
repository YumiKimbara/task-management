import React, { useState } from "react";
import Header from "./Components/layout/Header";
import Home from "./Components/pages/Home";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    sample: {
      minHeight: "calc(100vh - 130px)",
      display: "flex",
      justifyContent: "top",
      paddingLeft: "5rem",
      paddingRight: "5rem",
      paddingTop: "30px",
      paddingBottom: "30px",
      flexDirection: "column",
      backgroundColor: "#f0efeb",
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
