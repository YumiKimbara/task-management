const ListReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return { addTask: true };
    case "DELETE_TASK":
      return { deleteTask: true };
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
      //     task: listCtx.taskText,
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
    case "LEFT_TASK":
      return {
        ...state,
        leftTaskData: [...state.leftTaskData, action.payload],
      };
    case "DONE_TASK":
      return {
        ...state,
        doneTaskData: [...state.doneTaskData, action.payload],
      };
    case "TASK_TEXT":
      return { ...state, taskText: action.payload };
  }
};

export default ListReducer;
