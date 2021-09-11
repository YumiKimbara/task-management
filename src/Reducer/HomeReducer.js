const HomeReducer = (state, action) => {
  switch (action.type) {
    case "STORE_TASK":
      return {
        //inside of return, state will be overwitten, so I need to return all initial state(...state)
        ...state,
        //store copy of the previous data(...state.storeTaskData), and the newest data(action.payload)
        storeTaskData: [...state.storeTaskData, action.payload],
      };
    case "DONE_TASK":
      return {
        ...state,
        storeTaskData: state.storeTaskData.map((taskData) => {
          if (action.payload.id === taskData.id) {
            // return previous task data. also update isDone part
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
            // return previous task data. also update isDone part
            return { ...taskData, isDone: false };
          }

          return taskData;
        }),
      };
    case "KEY_TASK":
      return {
        ...state,
        storeTaskData: state.storeTaskData.map((taskData) => {
          if (action.payload.data.id === taskData.id) {
            // return previous task data. also update isKey part
            return { ...taskData, isKey: action.payload.key };
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
    case "CONFETTI":
      return { ...state, checkConfetti: true };
    case "EDIT_TASK":
      return {
        ...state,
        storeTaskData: state.storeTaskData.map((taskData) => {
          if (action.payload.data.id === taskData.id) {
            // return previous task data. also update isKey part
            return {
              ...taskData,
              task: action.payload.data.task,
              // isEdit: action.payload.edit,
            };
          }
          return taskData;
        }),
      };
    case "EDIT_STATUS":
      return { ...state, isEditing: action.payload };
  }
};

export default HomeReducer;
