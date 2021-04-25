import { useState, createContext, useReducer } from "react";
import { TToDoList } from "./components/ToDoList/types";
import TasksReducerAction from "./store/tasks/types";
import tasksReducer from "./store/tasks/reducer";
import Menu from "./components/Menu";
import ToDoList from "./components/ToDoList";

type ContextModel = {
  state: TToDoList;
  dispatch: React.Dispatch<TasksReducerAction>;
};
export const ToDoListDispatch = createContext({} as ContextModel);

const initialState: TToDoList = [];

const App = () => {
  const [addNewTaskOpen, setAddNewTaskOpen] = useState(false);
  const [tasks, dispatch] = useReducer(tasksReducer, initialState);
  const toggleAddTaskOpen = () => setAddNewTaskOpen(!addNewTaskOpen);

  return (
    <ToDoListDispatch.Provider value={{ state: tasks, dispatch }}>
      <Menu toggleAddTaskOpen={toggleAddTaskOpen} addNewTaskOpen={addNewTaskOpen} />

      <main>
        <div className="title">
          <h1>To-Do-List</h1>
          <p>
            with subtasks by <a href="https://github.com/vlorenzen/">Viktor Lorenzen</a>
          </p>
        </div>
        <ToDoList addNewTaskOpen={addNewTaskOpen} toggleAddTaskOpen={toggleAddTaskOpen} tasks={tasks} />
      </main>

      <button className="clear--btn" onClick={() => dispatch({ type: "CLEAR" })}>
        Clear All Completed Tasks!
      </button>
    </ToDoListDispatch.Provider>
  );
};

export default App;
