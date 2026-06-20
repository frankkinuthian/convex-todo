"use client";

import { use } from "react";
import { QuickAdd } from "@/components/todos/quick-add";
import { TodoList } from "@/components/todos/todo-list";
import type { Id } from "@/convex/_generated/dataModel";
import { useProject } from "@/hooks/use-projects";
import {
  useProjectTodos,
  useToggleComplete,
  useToggleStar,
} from "@/hooks/use-todos";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const projectId = id as Id<"projects">;

  const project = useProject(projectId);
  const todos = useProjectTodos(projectId);
  const toggleComplete = useToggleComplete();
  const toggleStar = useToggleStar();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        {project && (
          <span
            className="inline-block size-3 rounded-full shrink-0"
            style={{ backgroundColor: project.color }}
          />
        )}
        <div>
          <h1 className="text-xl font-semibold">
            {project?.name ?? "Project"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {todos?.length ?? 0} active tasks
          </p>
        </div>
      </div>
      <TodoList
        todos={todos}
        onToggleComplete={(todoId) => toggleComplete({ todoId })}
        onToggleStar={(todoId) => toggleStar({ todoId })}
      />
      <QuickAdd projectId={projectId} />
    </div>
  );
}
