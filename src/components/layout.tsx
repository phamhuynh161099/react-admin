import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import CustomBreadcrumb from "./customs/custom-breadcrumb";

// --sidebar-width-icon
const Layout: React.FC = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset
          className="max-w-full md:max-w-[calc(100vw-var(--sidebar-width))] 
          md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:max-w-[calc(100vw-var(--sidebar-width-icon))]"
        >
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <CustomBreadcrumb />
            </div>
          </header>
          <div className="">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default Layout;
