"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./ui/theme-toggle";

export function NavUser() {
  const { user } = useUser();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuItem>
          <ModeToggle />
        </SidebarMenuItem>
        <SidebarMenuButton size="lg" className="cursor-default">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8 rounded-lg",
              },
            }}
          />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {user?.fullName ?? "User"}
            </span>
            <span className="truncate text-xs">
              {user?.primaryEmailAddress?.emailAddress ?? ""}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
