"use client";

import { useState, useEffect } from "react";
import { Task } from "gantt-task-react";
import { v4 as uuidv4 } from "uuid";

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
  // Taskの配列とローディング状態を管理
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // タスクを保存する関数
  const saveTasks = (tasks: Task[]) => {
    // タスクを保存し、ローカルストレージにも保存
    setTasks(tasks);
    // json形式で保存
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  };

  // タスクをロードする関数
  useEffect(() => {
    // ローカルストレージからタスクを取得
    const loadTasks = () => {
      try {
        const storedTasks = localStorage.getItem(STORAGE_KEY);
        if (storedTasks) {
          //
          const parsedTasks = JSON.parse(storedTasks).map((task: Task) => ({
            ...task,
            start: new Date(task.start),
            end: new Date(task.end),
            id: task.id || String(uuidv4()),
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
