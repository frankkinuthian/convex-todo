"use client";

import { QuickAdd } from "@/components/todos/quick-add";
import { TodoList } from "@/components/todos/todo-list";
import {
  useToggleComplete,
  useToggleStar,
  useUpcomingTodos,
} from "@/hooks/use-todos";

export default function UpcomingPage() {
  const todos = useUpcomingTodos();
  const toggleComplete = useToggleComplete();
  const toggleStar = useToggleStar();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold">Upcoming</h1>
        <p className="text-sm text-muted-foreground">Tasks due in the future</p>
      </div>
      <TodoList
        todos={todos}
        onToggleComplete={(todoId) => toggleComplete({ todoId })}
        onToggleStar={(todoId) => toggleStar({ todoId })}
      />
      <QuickAdd />
    </div>
  );
}
