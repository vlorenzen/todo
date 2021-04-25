import TasksReducerAction from "./types";
import { TToDo, TToDoList } from "../../components/ToDoList/types";
import createID from "../../utils/createID";

const tasksReducer = (state: TToDoList, action: TasksReducerAction): TToDoList => {
  let newState = [...state];

  switch (action.type) {
    case "ADD":
      return [
        ...newState,
        {
          ...action.payload.task,
          id: createID(),
          dateAdded: new Date(),
          subtasks: action.payload.task.subtasks.filter((task) => (task.title === "" ? false : task)),
        },
      ];

    case "CLEAR":
      return newState
        .filter((task) => !task.completed)
        .map((task) => {
          return {
            ...task,
            subtasks: task.subtasks.filter((subtask) => !subtask.completed),
          };
        });

    case "REMOVE":
      const removeByID = (list: TToDoList, ID: string): TToDoList => {
        return list
          .filter((task) => task.id !== ID)
          .map((task) => {
            return { ...task, subtasks: removeByID(task.subtasks || [], ID) };
          });
      };

      return removeByID(newState, action.payload.id);

    case "UPDATE":
      const updateByID = (list: TToDoList, payload: TToDo): TToDoList => {
        return list
          .map((task) => {
            if (task.id === payload.id) return payload;
            return task;
          })
          .map((task) => {
            return { ...task, subtasks: updateByID(task.subtasks || [], payload) };
          });
      };

      return updateByID(newState, action.payload.task);

    case "LOAD":
      if (action.payload === null) return [];
      return action.payload;

    default:
      throw new Error();
  }
};

export default tasksReducer;
