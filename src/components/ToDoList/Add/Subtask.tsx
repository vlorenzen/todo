import { TToDo, TToDoList } from "../types";

type Props = {
  subtaskInputs: TToDoList;
  setSubtaskInputs: React.Dispatch<React.SetStateAction<TToDoList>>;
  createEmptySubtask: () => TToDo;
};

const AddSubTask = ({ subtaskInputs, setSubtaskInputs, createEmptySubtask }: Props) => {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setSubtaskInputs(
      subtaskInputs.map((s) => {
        if (s.id === id) return { ...s, title: e.target.value };
        return s;
      })
    );
  };

  const addMoreSubTasks = () => setSubtaskInputs([...subtaskInputs, createEmptySubtask()]);

  const removeSubTask = (id: string) => {
    if (subtaskInputs.length > 1)
      setSubtaskInputs(
        subtaskInputs.filter((s) => {
          if (s.id === id) return false;
          return s;
        })
      );
    setSubtaskInputs([createEmptySubtask()]);
  };

  return (
    <ul className="subtask">
      {subtaskInputs.length > 0 &&
        subtaskInputs.map(({ id, title }) => (
          <li className="list--item--name" key={id}>
            <input
              type="text"
              name="subtasks"
              value={title}
              placeholder="Add a subtask"
              onChange={(e) => inputHandler(e, id)}
            />
            <button title="Delete" onClick={() => removeSubTask(id)}>
              <i className="far fa-times-circle"></i>
            </button>
            <button title="Add more subtasks" onClick={addMoreSubTasks}>
              <i className="fas fa-plus-circle"></i>
            </button>
          </li>
        ))}
    </ul>
  );
};

export default AddSubTask;
