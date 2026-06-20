"use client";

import { useMutation } from "convex/react";
import { useEffect } from "react";
import { QuickAdd } from "@/components/todos/quick-add";
import { TodoList } from "@/components/todos/todo-list";
import { api } from "@/convex/_generated/api";
import {
  useInboxTodos,
  useToggleComplete,
  useToggleStar,
} from "@/hooks/use-todos";

export default function DashboardPage() {
  const storeUser = useMutation(api.users.mutations.store);

  const todos = useInboxTodos();
  const toggleComplete = useToggleComplete();
  const toggleStar = useToggleStar();

  useEffect(() => {
    storeUser();
  }, [storeUser]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold">Inbox</h1>
        <p className="text-sm text-muted-foreground">
          Tasks without a due date
        </p>
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
