const HomeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return { addTask: true };
    // case "DELETE_TASK":
    //   return { deleteTask: true };
    case "STORE_TASK":
      // state = {
      //   addTask: false,
      //   deleteTask: false,
      //   storeTaskData: [],
      //   taskText: "",
      // };

      // state = {
      //   addTask: false,
      //   deleteTask: false,
      //   storeTaskData: [{
      //     id: uuidv4(),
      //     task: HomeCtx.taskText,
      //   }],
      //   taskText: "",
      // };

      // const obj1 = {
      //   foo: "bar",
      //   arr: [1, 2, 3]
      // };

      //pushしてしまうと元のstateを変更してしまう。
      // obj1.arr.push(4);

      //stateは変更してはいけないから、...でコピーして変更するように。
      //また前の該当以外のstateも...でコピーして持ってくるように。
      //そうでないと該当のstateのみで上書きされてしまう。
      // const obj2 = { ...obj1, arr: [...obj1.arr, 4] };

      // return { ...state, storeTaskData: action.payload };

      return {
        //ここのstateはinitial state全てをここに入れるので必要。
        ...state,
        //storeTaskData内に前回までのstateとaction.payloadを入れるようにする。
        storeTaskData: [...state.storeTaskData, action.payload],
      };
    // case "LEFT_TASK":
    //   return {
    //     ...state,
    //     leftTaskData: [action.payload],
    //   };
    // case "DONE_TASK":
    //   return {
    //     ...state,
    //     doneTaskData: [...state.doneTaskData, action.payload],
    //   };
    case "DONE_TASK":
      // action = { type: "nanika", payload: { id: ??? } }

      return {
        ...state,
        storeTaskData: state.storeTaskData.map((taskData) => {
          if (action.payload.id === taskData.id) {
            // 元々あるtaskDataのうち、isDoneだけ更新する。
            return { ...taskData, isDone: true };
          }

          return taskData;
        }),
      };
    case "UNDONE_TASK":
      return {
        ...state,
        storeTaskData: state.storeTaskData.map((taskData) => {
          if (action.payload.id === taskData.id) {
            // 元々あるtaskDataのうち、isDoneだけ更新する。
            return { ...taskData, isDone: false };
          }

          return taskData;
        }),
      };
    case "KEY_TASK":
      return {
        ...state,
        storeTaskData: state.storeTaskData.map((taskData) => {
          if (action.payload.id === taskData.id) {
            // 元々あるtaskDataのうち、isDoneだけ更新する。
            return { ...taskData, isKey: action.payload.isKey };
          }
          return taskData;
        }),
      };
    case "DELETE_TASK":
      return {
        ...state,
        storeTaskData: state.storeTaskData.filter((taskData) => {
          return action.payload.id !== taskData.id;
        }),
      };
    case "DELETE_ALL_TASK":
      return {
        ...state,
        storeTaskData: action.payload,
      };
    case "TASK_TEXT":
      return { ...state, taskText: action.payload };
    case "KEY_TASK_PAGE":
      return { ...state, keyTaskPage: false };
  }
};

export default HomeReducer;
