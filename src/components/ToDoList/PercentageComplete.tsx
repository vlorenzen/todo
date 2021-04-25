type Props = {
  tasksCompleted: number;
  taskLength: number;
};
const PercentageComplete = ({ tasksCompleted, taskLength }: Props) => {
  return (
    <li className="progression--wrapper">
      <div>
        {tasksCompleted} of {taskLength} Subtasks Completed.
      </div>

      <div className="progression">
        <div className="bar" style={{ width: `${(tasksCompleted / taskLength) * 100}%` }} />
      </div>
    </li>
  );
};

export default PercentageComplete;
