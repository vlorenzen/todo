type Props = {
  toggleAddTaskOpen: () => void;
  addNewTaskOpen: boolean;
};

const Menu = ({ toggleAddTaskOpen, addNewTaskOpen }: Props) => {
  return (
    <menu>
      <button onClick={toggleAddTaskOpen} name="Open Add New Task">
        {addNewTaskOpen ? <i className="fas fa-times"></i> : <i className="fas fa-plus"></i>}
      </button>
    </menu>
  );
};

export default Menu;
