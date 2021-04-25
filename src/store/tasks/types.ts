import { TToDo, TToDoList } from "../../components/ToDoList/types";

type TasksReducerAction =
  | { type: "CLEAR" }
  | { type: "ADD"; payload: { task: TToDo } }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "UPDATE"; payload: { task: TToDo } }
  | { type: "LOAD"; payload: TToDoList };

export default TasksReducerAction;
