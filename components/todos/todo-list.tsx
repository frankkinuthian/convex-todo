"use client";

import { CheckSquare } from "lucide-react";
import { TodoItem } from "@/components/todos/todo-item";
import type { Doc } from "@/convex/_generated/dataModel";

type TodoListProps = {
  todos: Doc<"todos">[] | null | undefined;
  onToggleComplete: (todoId: Doc<"todos">["_id"]) => void;
  onToggleStar: (todoId: Doc<"todos">["_id"]) => void;
};

export function TodoList({
  todos,
  onToggleComplete,
  onToggleStar,
}: TodoListProps) {
  // Loading state — useQuery returns undefined while fetching
  if (todos === undefined) {
    return (
      <div className="flex flex-col gap-1 p-2">
        {["s1", "s2", "s3"].map((key) => (
          <div
            key={key}
            className="h-10 rounded-lg bg-muted/50 animate-pulse"
          />
        ))}
      </div>
    );
  }

  // Empty state — authenticated but no todos
  if (!todos || todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-muted-foreground">
        <CheckSquare className="size-10 opacity-20" />
        <p className="text-sm">No tasks here</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0.5">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onToggleStar={onToggleStar}
        />
      ))}
    </div>
  );
}
