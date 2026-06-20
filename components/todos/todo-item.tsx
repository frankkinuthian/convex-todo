"use client";

import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

type Priority = "low" | "medium" | "high";

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  low: {
    label: "Low",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  medium: {
    label: "Medium",
    className:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  high: {
    label: "High",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
};

type TodoItemProps = {
  todo: Doc<"todos">;
  onToggleComplete: (todoId: Doc<"todos">["_id"]) => void;
  onToggleStar: (todoId: Doc<"todos">["_id"]) => void;
};

export function TodoItem({
  todo,
  onToggleComplete,
  onToggleStar,
}: TodoItemProps) {
  const priority = priorityConfig[todo.priority];

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50",
        todo.completed && "opacity-50",
      )}
    >
      {/* Checkbox */}
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggleComplete(todo._id)}
        className="shrink-0"
      />

      {/* Title */}
      <span
        className={cn(
          "flex-1 text-sm",
          todo.completed && "line-through text-muted-foreground",
        )}
      >
        {todo.title}
      </span>

      {/* Priority badge */}
      <Badge
        variant="outline"
        className={cn("text-xs font-normal shrink-0", priority.className)}
      >
        {priority.label}
      </Badge>

      {/* Star button */}
      <Button
        variant="ghost"
        size="icon"
        className="size-7 shrink-0"
        onClick={() => onToggleStar(todo._id)}
      >
        <Star
          className={cn(
            "size-4",
            todo.starred
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground",
          )}
        />
      </Button>
    </div>
  );
}
