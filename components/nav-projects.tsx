"use client";

import { ChevronRight, FolderKanban, Plus } from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/hooks/use-projects";

export function NavProjects() {
  const projects = useProjects();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Projects">
                <FolderKanban />
                <span>Projects</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {/* Loading */}
                {projects === undefined && (
                  <>
                    <SidebarMenuSubItem>
                      <Skeleton className="h-6 w-full rounded-md" />
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <Skeleton className="h-6 w-3/4 rounded-md" />
                    </SidebarMenuSubItem>
                  </>
                )}

                {/* Projects list */}
                {projects
                  ?.filter((p) => !p.archived)
                  .map((project) => (
                    <SidebarMenuSubItem key={project._id}>
                      <SidebarMenuSubButton asChild>
                        <Link href={`/projects/${project._id}`}>
                          <span
                            className="inline-block size-2 rounded-full shrink-0"
                            style={{ backgroundColor: project.color }}
                          />
                          <span>{project.name}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}

                {/* Empty state */}
                {projects !== undefined &&
                  projects !== null &&
                  projects.filter((p) => !p.archived).length === 0 && (
                    <SidebarMenuSubItem>
                      <span className="px-2 py-1 text-xs text-muted-foreground">
                        No projects yet
                      </span>
                    </SidebarMenuSubItem>
                  )}

                {/* Create project */}
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/projects/new">
                      <Plus className="size-3" />
                      <span>New project</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
