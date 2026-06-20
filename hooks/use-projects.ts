import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

// ─── Queries ────────────────────────────────────────────────────────────────

export function useProjects() {
  return useQuery(api.projects.queries.getProjectsByUserId);
}

export function useProject(projectId: Id<"projects">) {
  return useQuery(api.projects.queries.getProjectById, { projectId });
}

// ─── Mutations ───────────────────────────────────────────────────────────────

export function useCreateProject() {
  return useMutation(api.projects.mutations.create);
}

export function useArchiveProject() {
  return useMutation(api.projects.mutations.archive);
}

export function useRemoveProject() {
  return useMutation(api.projects.mutations.remove);
}
