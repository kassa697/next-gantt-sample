"use client";

import TaskFormModal from "./task-form";

interface TaskAddDialogProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit?: (data: {
    name: string;
    startDate: Date;
    endDate: Date;
    progress: number;
  }) => void;
}

const TaskAddDialog = ({
  isOpen,
  onRequestClose,
  onSubmit,
}: TaskAddDialogProps) => {
  return (
    <TaskFormModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onSubmit={onSubmit}
      title="タスクを追加"
    />
  );
};

export default TaskAddDialog;
