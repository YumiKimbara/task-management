import React, { useState } from "react";
import Home from "../Components/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../Components/layout/Header";
import List from "../Components/pages/List";
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

const AppRouter = () => {
  const [checkKey, setCheckKey] = useState(false);
  const classes = useStyles();

  return (
    <>
      <Router>
        <Header checkKey={checkKey} setCheckKey={setCheckKey} />
        <Switch>
          <div className={classes.sample}>
            <Route path="/" exact component={Home} />
            <Route
              path="/list"
              exact
              render={(props) => <List checkKey={checkKey} {...props} />}
            />
          </div>
        </Switch>
      </Router>
    </>
  );
};

export default AppRouter;
