import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  // Frame,
  GalleryVerticalEnd,
  // Map,
  // PieChart,
  Settings2,
  // SquareTerminal,
  UserCog,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { authApi } from "@/services/AuthService";
import { useNavigate } from "react-router-dom";
import { authAction } from "@/redux/slices/authSlice";

import neoLogoHsVina from "../assets/images/neo-logo-hs.png";

// This is sample data.
const data = {  
  navMain: [
    {
      title: "User",
      url: "#",
      icon: UserCog,
      items: [
        {
          title: "List",
          url: "/admin/user/list",
        },
        {
          title: "Role",
          url: "/admin/user/role",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Dashboard",
          url: "/admin/model-dashboard",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      const response: any = await authApi.logout();
      console.log(response);
      dispath(authAction.setLogout());
    } catch (error) {
      console.log("error", error);
      alert(error);
    } finally {
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="h-[50px] mt-2 flex justify-center items-center">
        <img
          src={neoLogoHsVina}
          className="h-full w-full object-contain"
          alt="Hs Vina"
        />
      </div>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} handleLogout={handleLogout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
