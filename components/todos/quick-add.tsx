"use client";

import { Plus, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CreateTodoDrawer } from "@/components/todos/create-todo-drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Id } from "@/convex/_generated/dataModel";
import { useCreateTodo } from "@/hooks/use-todos";

type QuickAddProps = {
  projectId?: Id<"projects">;
};

export function QuickAdd({ projectId }: QuickAddProps) {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const createTodo = useCreateTodo();

  const handleSubmit = async () => {
    const trimmed = title.trim();
    if (!trimmed) return;

    setIsLoading(true);
    try {
      await createTodo({
        title: trimmed,
        priority: "medium",
        ...(projectId && { projectId }),
      });
      setTitle("");
    } catch {
      toast.error("Failed to create task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 rounded-lg border border-dashed px-3 py-2 transition-colors focus-within:border-primary focus-within:bg-muted/30">
        <Plus className="size-4 shrink-0 text-muted-foreground" />
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
            if (e.key === "Escape") setTitle("");
          }}
          placeholder="Add a task..."
          disabled={isLoading}
          className="h-auto border-none bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
        />
        {title.trim() && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleSubmit}
            disabled={isLoading}
            className="h-6 px-2 text-xs"
          >
            Add
          </Button>
        )}
        <Button
          size="icon"
          variant="ghost"
          className="size-7 shrink-0"
          onClick={() => setDrawerOpen(true)}
        >
          <SlidersHorizontal className="size-4 text-muted-foreground" />
        </Button>
      </div>

      <CreateTodoDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        defaultProjectId={projectId}
      />
    </>
  );
}
