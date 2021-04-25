import { useContext, useState } from "react";
import { TToDo, TToDoList } from "./types";
import { ToDoListDispatch } from "../../App";
import createEmptyTask from "../../utils/createEmptyTask";
import PercentageComplete from "./PercentageComplete";
import AddSubtask from "./Add/Subtask";

type Props = TToDo & { isChild?: boolean };

const SingleTask = ({ id, title, dateAdded, completed, subtasks, isChild = false }: Props) => {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState("");
  const { dispatch } = useContext(ToDoListDispatch);
  const [subtaskInputs, setSubtaskInputs] = useState<TToDoList>([createEmptyTask()]);

  const removeTask = () => dispatch({ type: "REMOVE", payload: { id } });

  const saveTaskEdit = () => {
    dispatch({
      type: "UPDATE",
      payload: {
        task: {
          id,
          title: input === "" ? title : input,
          dateAdded,
          completed,
          subtasks: [...subtasks, ...subtaskInputs.filter((task) => (task.title === "" ? false : task))],
        },
      },
    });
    setInput("");
    setEdit(false);
    setSubtaskInputs([createEmptyTask()]);
  };

  const toggleTaskComplete = () => {
    dispatch({
      type: "UPDATE",
      payload: { task: { id, title, dateAdded, completed: !completed, subtasks } },
    });
  };

  return (
    <li className={`list--item ${completed && "complete"}`}>
      <div className="list--item--name">
        {edit ? (
          <input
            type="text"
            name="title"
            placeholder={title}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        ) : (
          <p onClick={toggleTaskComplete}>
            <i className={completed ? "fas fa-check-square" : "far fa-square"} />
            {title}
          </p>
        )}

        <button onClick={completed ? removeTask : edit ? saveTaskEdit : () => setEdit(true)}>
          <i className={`fas ${completed ? "fa-trash-alt" : edit ? "far fa-check-circle green" : "fa-edit"}`} />
        </button>
      </div>

      {edit && (
        <AddSubtask
          subtaskInputs={subtaskInputs}
          setSubtaskInputs={setSubtaskInputs}
          createEmptySubtask={createEmptyTask}
        />
      )}

      {subtasks.length > 0 && (
        <ul className="subtask">
          <PercentageComplete
            tasksCompleted={subtasks.reduce((counter, { completed }) => {
              if (completed === true) return (counter += 1);
              return counter;
            }, 0)}
            taskLength={subtasks.length}
          />

          {subtasks.map((subtask) => (
            <SingleTask
              key={subtask.id}
              id={subtask.id}
              dateAdded={dateAdded}
              title={subtask.title}
              completed={subtask.completed}
              subtasks={subtask.subtasks}
              isChild={true}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SingleTask;
