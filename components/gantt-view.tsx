"use client";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";

// Taskの型定義を拡張
interface ExtendedTask extends Task {
  start: Date;
  end: Date;
}

interface GanttViewProps {
  tasks: ExtendedTask[];
  onEdit: (task: ExtendedTask) => void;
  onDelete: (taskId: string) => void;
}

const GanttView = ({ tasks, onEdit, onDelete }: GanttViewProps) => {
  // タスクが存在しない場合の表示
  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-[300px] border rounded-lg bg-gray-50">
        <p className="text-gray-500">タスクが存在しません</p>
      </div>
    );
  }

  const TaskListHeader = () => {
    return (
      <div className="grid grid-cols-12 gap-2 p-2 bg-gray-100 font-semibold">
        <div className="col-span-4">タスク名</div>
        <div className="col-span-2">開始日</div>
        <div className="col-span-2">終了日</div>
        <div className="col-span-2">進捗</div>
        <div className="col-span-2">操作</div>
      </div>
    );
  };

  const TaskListItem = ({ task }: { task: ExtendedTask }) => {
    return (
      <div className="grid grid-cols-12 gap-2 p-2 border-b hover:bg-gray-50">
        <div className="col-span-4 flex items-center">{task.name}</div>
        <div className="col-span-2 flex items-center">
          {task.start.toLocaleDateString()}
        </div>
        <div className="col-span-2 flex items-center">
          {task.end.toLocaleDateString()}
        </div>
        <div className="col-span-2 flex items-center">{task.progress}%</div>
        <div className="col-span-2 flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(task)}
            className="p-2"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (confirm("このタスクを削除してもよろしいですか？")) {
                onDelete(task.id);
              }
            }}
            className="p-2 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="border rounded-lg overflow-hidden">
        <TaskListHeader />
        <div className="max-h-[300px] overflow-y-auto">
          {tasks.map((task) => (
            <TaskListItem key={task.id} task={task} />
          ))}
        </div>
      </div>

      <div className="w-full h-[500px] overflow-x-auto border rounded-lg">
        <Gantt
          tasks={tasks}
          viewMode={ViewMode.Week}
          locale="ja"
          listCellWidth="200px"
          ganttHeight={300}
          columnWidth={60}
          barFill={75}
          barCornerRadius={3}
          TooltipContent={(task) => (
            <div className="bg-white p-2 rounded shadow-lg">
              <div className="font-bold mb-2">{task.task.name}</div>
              <div>進捗: {task.task.progress}%</div>
              <div>開始: {task.task.start.toLocaleDateString()}</div>
              <div>終了: {task.task.end.toLocaleDateString()}</div>
              <div className="flex space-x-2 mt-2"></div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default GanttView;
