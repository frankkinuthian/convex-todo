import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

// ─── Queries ────────────────────────────────────────────────────────────────

export function useInboxTodos() {
  return useQuery(api.todos.queries.listInbox);
}

export function useTodayTodos() {
  return useQuery(api.todos.queries.listToday);
}

export function useUpcomingTodos() {
  return useQuery(api.todos.queries.listUpcoming);
}

export function useStarredTodos() {
  return useQuery(api.todos.queries.listStarred);
}

export function useProjectTodos(projectId: Id<"projects">) {
  return useQuery(api.todos.queries.listByProject, { projectId });
}

// ─── Mutations ───────────────────────────────────────────────────────────────

export function useCreateTodo() {
  return useMutation(api.todos.mutations.create);
}

export function useToggleComplete() {
  return useMutation(api.todos.mutations.toggleComplete);
}

export function useToggleStar() {
  return useMutation(api.todos.mutations.toggleStar);
}

export function useUpdateTodo() {
  return useMutation(api.todos.mutations.update);
}

export function useRemoveTodo() {
  return useMutation(api.todos.mutations.remove);
}
