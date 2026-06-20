import { Calendar, CheckSquare, FolderKanban, Settings2 } from "lucide-react";

export const data = {
  navMain: [
    {
      title: "Tasks",
      url: "/dashboard",
      icon: CheckSquare,
      isActive: true,
      items: [
        { title: "Inbox", url: "/dashboard" },
        { title: "Today", url: "/today" },
        { title: "Upcoming", url: "/upcoming" },
        { title: "Starred", url: "/starred" },
      ],
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: FolderKanban,
      items: [
        { title: "Personal", url: "/dashboard/projects/personal" },
        { title: "Work", url: "/dashboard/projects/work" },
      ],
    },
    {
      title: "Calendar",
      url: "/dashboard/calendar",
      icon: Calendar,
      items: [],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [
        { title: "General", url: "/dashboard/settings" },
        { title: "Account", url: "/dashboard/settings/account" },
      ],
    },
  ],
};
