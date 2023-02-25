interface boardMockData {
  tasks: { [id: string]: { id: string; content: string } };
  columns: { [id: string]: { id: string; title: string; taskIds: string[] } };
  columnOrder: string[];
}
export interface Task {
  id: string;
  content: string;
}
export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  tasksOrder: string[];
}
export interface boardMockData2 {
  columns: Column[];
  columnOrder: string[];
}

const initialData: boardMockData = {
  tasks: {
    "task-1": { id: "task-1", content: "task-1 content" },
    "task-2": { id: "task-2", content: "task-2 content" },
    "task-3": { id: "task-3", content: "task-3 content" },
    "task-4": { id: "task-4", content: "task-4 content" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "Doing",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};
export const initialData2: boardMockData2 = {
  columns: [
    {
      id: "column-1",
      title: "Done",
      tasks: [
        { id: "task-1", content: "task-1 content" },
        { id: "task-2", content: "task-2 content" },
        { id: "task-3", content: "task-3 content" },
      ],
      tasksOrder: ["task-1", "task-2", "task-3"],
    },
    {
      id: "column-2",
      title: "Backlog",
      tasks: [
        { id: "task-4", content: "task-4 content" },
        { id: "task-5", content: "task-5 content" },
        { id: "task-6", content: "task-6 content" },
      ],
      tasksOrder: ["task-4", "task-5", "task-6"],
    },
    {
      id: "column-3",
      title: "Backlog",
      tasks: [
        { id: "task-7", content: "task-7 content" },
        { id: "task-8", content: "task-8 content" },
        { id: "task-9", content: "task-9 content" },
      ],
      tasksOrder: ["task-7", "task-8", "task-9"],
    },
  ],
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default initialData;
