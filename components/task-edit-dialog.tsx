"use client";

import React from "react";
import { Task } from "gantt-task-react";
import TaskFormModal from "./task-form";

interface TaskEditDialogProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit?: (data: {
    name: string;
    startDate: Date;
    endDate: Date;
    progress: number;
  }) => void;
  task: Task;
}

const TaskEditDialog = ({
  isOpen,
  onRequestClose,
  onSubmit,
  task,
}: TaskEditDialogProps) => {
  return (
    <TaskFormModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onSubmit={onSubmit}
      title="タスクを編集"
      defaultValues={{
        name: task.name,
        startDate: new Date(task.start),
        endDate: new Date(task.end),
        progress: task.progress,
      }}
    />
  );
};

export default TaskEditDialog;
