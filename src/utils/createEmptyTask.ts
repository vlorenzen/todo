import createID from "./createID";
import { TToDo } from "../components/ToDoList/types";

const createEmptyTask = (): TToDo => ({
  id: createID(),
  title: "",
  dateAdded: new Date(),
  completed: false,
  subtasks: [],
});

export default createEmptyTask;
