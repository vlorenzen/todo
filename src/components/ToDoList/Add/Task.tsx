import { useContext, useState } from "react";
import { ToDoListDispatch } from "../../../App";
import { TToDo } from "../types";
import createEmptyTask from "../../../utils/createEmptyTask";
import AddSubtask from "./Subtask";

type Props = {
  toggleAddTaskOpen: () => void;
};

const AddTask = ({ toggleAddTaskOpen }: Props) => {
  const [taskInput, setTaskInput] = useState<TToDo>(createEmptyTask());
  const [subtaskInputs, setSubtaskInputs] = useState<TToDo[]>([createEmptyTask()]);

  const { dispatch } = useContext(ToDoListDispatch);

  const handleSubmit = () => {
    if (taskInput.title !== "")
      dispatch({
        type: "ADD",
        payload: { task: { ...taskInput, subtasks: subtaskInputs } },
      });
    setTaskInput(createEmptyTask());
    setSubtaskInputs([createEmptyTask()]);
    toggleAddTaskOpen();
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput({
      ...taskInput,
      title: e.target.value,
    });
  };

  return (
    <li className="list--item add--task">
      <div className="list--item--name">
        <input
          type="text"
          name="title"
          placeholder="Add a task"
          value={taskInput.title}
          onChange={inputHandler}
          autoFocus
        />
        <button title="Save" onClick={handleSubmit}>
          <i className="far fa-check-circle green" />
        </button>
      </div>
      <ul>
        <AddSubtask
          subtaskInputs={subtaskInputs}
          setSubtaskInputs={setSubtaskInputs}
          createEmptySubtask={createEmptyTask}
        />
      </ul>
    </li>
  );
};

export default AddTask;
