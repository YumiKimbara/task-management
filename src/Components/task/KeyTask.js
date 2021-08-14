import React, { useContext, useState } from "react";
import HomeContext from "../../Context/HomeContext";
import TaskCard from "./TaskCard";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    keyTaskDone: {
      color: "#484848",
    },
    noKeyTaskMessage: {
      textAlign: "center",
      paddingTop: "10rem",
    },
  })
);

const KeyTask = ({ checkKey }) => {
  const homeCtx = useContext(HomeContext);
  const classes = useStyles();

  console.log(homeCtx.storeTaskData);

  const noKeyTask =
    homeCtx.storeTaskData &&
    homeCtx.storeTaskData.every((data) => {
      return !data.isKey;
    });

  // const [key, setKey] = useState("");

  // const keyHandler = (isKeyTask) => {
  //   console.log(isKeyTask);
  //   setKey(isKeyTask);
  // };

  return (
    <>
      {console.log(homeCtx.storeTaskData)}
      {homeCtx.storeTaskData && (
        <div>
          <h2 className={classes.keyTaskDone}>KEY TASK</h2>
          <TaskCard
            checkKey={checkKey}
            // keyHandler={keyHandler}
            cardData={homeCtx.storeTaskData.filter((item) => item.isKey)}
          />
        </div>
      )}
      {noKeyTask && (
        <div className={classes.noKeyTaskMessage}>
          <p>KEY TASK DOES'NT EXIST</p>
        </div>
      )}
    </>
  );
};

export default KeyTask;

//状態管理 = state をどのように管理していくか。
//同じstateをいくつものコンポーネントに買いておくと、状態が分散してしまう。一つにまとめるべき。
//scoped stateとglobal stateがある。scoped stateはコンポーネントの中にある。global stateはコンポーネントの外にある。
//何が入力されているかどうかなど他にコンポーネントに必要ないstateはscoped stateでOK
//global stateはapp.jsなど最上位のコンポーネントにおいておく(usestate)もしくはcontect api使う。
//iskeyで変更する(e.target.clicked)(context API)
//context APIは状態を管理するものではなく、Contect内でContextを使うや関数を渡したりできるもの。Reduxの方がより実践的だから勉強。
//業界の勉強はしておくように。
//バックエンドかフロントエンド側にシニアの人間がいないとプロジェクトがどう進めばいいかわからない。
//規模が多すぎて終わらない。
//シニアが一人でもいれば良いけど。
