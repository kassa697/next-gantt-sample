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
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const onAddTask = (formData: {
    name: string;
    startDate: Date;
    endDate: Date;
    progress: number;
  }) => {
    handleAddTask(tasks, formData, saveTasks);
    setIsAddDialogOpen(false);
  };

  const onUpdateTask = (formData: {
    name: string;
    startDate: Date;
    endDate: Date;
    progress: number;
  }) => {
    handleUpdateTask(tasks, selectedTask, formData, saveTasks);
    setIsEditDialogOpen(false);
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
        {/* タスクを追加するボタン */}
        <button
          // ダイアログを開く
          onClick={() => setIsAddDialogOpen(true)}
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
            setIsEditDialogOpen(true);
          }}
          onDelete={onDeleteTask}
        />
      </div>

      <TaskAddDialog
        // trueになれば開く
        isOpen={isAddDialogOpen}
        onRequestClose={() => setIsAddDialogOpen(false)}
        onSubmit={onAddTask}
      />

      {selectedTask && (
        <TaskEditDialog
          isOpen={isEditDialogOpen}
          onRequestClose={() => {
            setIsEditDialogOpen(false);
            setSelectedTask(null);
          }}
          onSubmit={onUpdateTask}
          task={selectedTask}
        />
      )}
    </div>
  );
}
