interface boardMockData {
  tasks: { [id: string]: { id: string; content: string } };
  columns: { [id: string]: { id: string; title: string; taskIds: string[] } };
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

export default initialData;
