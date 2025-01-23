import { v4 as uuidv4 } from "uuid";
import { Task } from "gantt-task-react";

export const handleAddTask = (
  tasks: Task[],
  formData: {
    name: string;
    startDate: Date;
    endDate: Date;
    progress: number;
  },
  saveTasks: (tasks: Task[]) => void
) => {
  const newTask: Task = {
    start: formData.startDate,
    end: formData.endDate,
    name: formData.name,
    id: uuidv4(), // 一意のIDを生成
    type: "task",
    progress: formData.progress,
    isDisabled: false,
    styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
  };

  saveTasks([...tasks, newTask]);
};

export const handleUpdateTask = (
  tasks: Task[],
  selectedTask: Task | null,
  formData: {
    name: string;
    startDate: Date;
    endDate: Date;
    progress: number;
  },
  saveTasks: (tasks: Task[]) => void
) => {
  if (!selectedTask) return;

  const updatedTasks = tasks.map((task) =>
    task.id === selectedTask.id
      ? {
          ...task,
          name: formData.name,
          start: formData.startDate,
          end: formData.endDate,
          progress: formData.progress,
        }
      : task
  );

  saveTasks(updatedTasks);
};

export const handleDeleteTask = (
  tasks: Task[],
  taskId: string,
  saveTasks: (tasks: Task[]) => void
) => {
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  saveTasks(updatedTasks);
};
