export type TToDo = {
  id: string;
  title: string;
  dateAdded: Date;
  completed: boolean;
  subtasks: TToDo[];
};

export type TToDoList = TToDo[];
