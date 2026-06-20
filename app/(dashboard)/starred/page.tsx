"use client";

import { TodoList } from "@/components/todos/todo-list";
import {
  useStarredTodos,
  useToggleComplete,
  useToggleStar,
} from "@/hooks/use-todos";

export default function StarredPage() {
  const todos = useStarredTodos();
  const toggleComplete = useToggleComplete();
  const toggleStar = useToggleStar();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold">Starred</h1>
        <p className="text-sm text-muted-foreground">Your important tasks</p>
      </div>
      <TodoList
        todos={todos}
        onToggleComplete={(todoId) => toggleComplete({ todoId })}
        onToggleStar={(todoId) => toggleStar({ todoId })}
      />
    </div>
  );
}
