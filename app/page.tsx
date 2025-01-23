"use client";
import { useState } from "react";
import GanttView from "@/components/gantt-view";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useTasks from "@/hooks/useTasks";
import {
  handleAddTask,
  handleUpdateTask,
  handleDeleteTask,
} from "@/utils/task-utils";
import LoadingSpinner from "@/components/loading-spinner";
import { Task } from "gantt-task-react";
import TaskAddDialog from "@/components/task-add-dialog";
import TaskEditDialog from "@/components/task-edit-dialog";

export default function Home() {
  const { tasks, isLoading, saveTasks } = useTasks();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const onAddTask = (formData: {
    name: string;
    startDate: Date;
    endDate: Date;
    progress: number;
  }) => {
    handleAddTask(tasks, formData, saveTasks);
    setIsAddModalOpen(false);
  };

  const onUpdateTask = (formData: {
    name: string;
    startDate: Date;
    endDate: Date;
    progress: number;
  }) => {
    handleUpdateTask(tasks, selectedTask, formData, saveTasks);
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  const onDeleteTask = (taskId: string) => {
    handleDeleteTask(tasks, taskId, saveTasks);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex items-center justify-between w-full p-4">
        <h1 className="text-2xl font-bold">ガントチャート</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className={cn(buttonVariants())}
        >
          タスクを追加
        </button>
      </div>

      <div className="w-full px-4">
        <GanttView
          tasks={tasks}
          onEdit={(task) => {
            setSelectedTask(task);
            setIsEditModalOpen(true);
          }}
          onDelete={onDeleteTask}
        />
      </div>

      <TaskAddDialog
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        onSubmit={onAddTask}
      />

      {selectedTask && (
        <TaskEditDialog
          isOpen={isEditModalOpen}
          onRequestClose={() => {
            setIsEditModalOpen(false);
            setSelectedTask(null);
          }}
          onSubmit={onUpdateTask}
          task={selectedTask}
        />
      )}
    </div>
  );
}
