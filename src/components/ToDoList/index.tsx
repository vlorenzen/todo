import AddTask from "./Add/Task";
import SingleTask from "./SingleTask";
import { TToDoList } from "./types";

type Props = {
  toggleAddTaskOpen: () => void;
  addNewTaskOpen: boolean;
  tasks: TToDoList;
};

const ToDoList = ({ toggleAddTaskOpen, addNewTaskOpen, tasks }: Props) => {
  return (
    <ul>
      {addNewTaskOpen && <AddTask toggleAddTaskOpen={toggleAddTaskOpen} />}

      {tasks.map(({ id, title, dateAdded, completed, subtasks }) => (
        <SingleTask key={id} id={id} title={title} dateAdded={dateAdded} completed={completed} subtasks={subtasks} />
      ))}
    </ul>
  );
};

export default ToDoList;
