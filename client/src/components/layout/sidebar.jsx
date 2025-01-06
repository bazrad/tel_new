import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "DB",
    email: "m@jishee.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "ШЧ-1",
      logo: GalleryVerticalEnd,
      plan: "станц",
    },
    {
      name: "ШЧ-2",
      logo: AudioWaveform,
      plan: "станц",
    },
    {
      name: "ШЧ-3",
      logo: Command,
      plan: "станц",
    },
  ],
  navMain: [
    {
      title: "Суурь мэдээлэл",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Станцын мэдээлэл", url: "station" },
        { title: "Ярианы түүх", url: "call" },
        { title: "Цэнэглэлт", url: "/payment" },
        { title: "Цэнэглэлт бүртгэл", url: "history" },
        { title: "Турших", url: "example" },
        { title: "Суурь мэдээлэл", url: "example2" },
      ],
    },
    {
      title: "Хэрэглэгч",
      url: "/",
      icon: Bot,
      items: [
        { title: "Хэрэглэгчийн жагсаалт", url: "/client" },
        { title: "Оруулах", url: "#" },
        { title: "Оруулах2", url: "#" },
      ],
    },
    {
      title: "Тайлан",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Introduction", url: "#" },
        { title: "Get Started", url: "#" },
        { title: "Tutorials", url: "#" },
        { title: "Changelog", url: "#" },
      ],
    },
    {
      title: "Тохиргоо",
      url: "#",
      icon: Settings2,
      items: [
        { title: "General", url: "#" },
        { title: "Team", url: "#" },
        { title: "Billing", url: "#" },
        { title: "Limits", url: "#" },
      ],
    },
  ],
  projects: [
    { name: "Касс", url: "#", icon: Frame },
    { name: "Бүртгэл", url: "#", icon: PieChart },
    { name: "Аялал", url: "#", icon: Map },
  ],
  basename: "/login",
};

const TeleSidebar = ({ ...props }) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        {/* Add footer content if needed */}
        {/* If there's no footer content, this can be removed */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default TeleSidebar;
