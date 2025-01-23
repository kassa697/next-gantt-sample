"use client";

import { useState, useEffect } from "react";
import { Task } from "gantt-task-react";

const STORAGE_KEY = "gantt-tasks";

const DEFAULT_TASK: Task = {
  start: new Date(2025, 1, 1),
  end: new Date(2025, 1, 2),
  name: "サンプルタスク",
  id: "Task 0",
  type: "task",
  progress: 0,
  isDisabled: false,
  styles: {
    progressColor: "#ffbb54",
    progressSelectedColor: "#ff9e0d",
  },
};

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const saveTasks = (tasks: Task[]) => {
    setTasks(tasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  };

  useEffect(() => {
    const loadTasks = () => {
      try {
        const storedTasks = localStorage.getItem(STORAGE_KEY);
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks).map((task: Task) => ({
            ...task,
            start: new Date(task.start),
            end: new Date(task.end),
            id: task.id || String(Math.random()),
            type: task.type || "task",
            progress: task.progress || 0,
            isDisabled: task.isDisabled || false,
            styles: task.styles || {
              progressColor: "#ffbb54",
              progressSelectedColor: "#ff9e0d",
            },
          }));
          saveTasks(parsedTasks);
        } else {
          saveTasks([DEFAULT_TASK]);
        }
      } catch (error) {
        console.error("Error loading tasks:", error);
        saveTasks([DEFAULT_TASK]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  return { tasks, isLoading, saveTasks };
};

export default useTasks;
