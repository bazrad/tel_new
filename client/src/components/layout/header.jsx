import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { Search } from "lucide-react";

const TelHeader = () => {
  const user = {
    name: "Bazarvaani",
    email: "bazrad13@gmail.com",
    avatar: "path/to/avatar.jpg",
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Root
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Menu</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="ml-auto flex items-center gap-2 px-4 w-1/2 justify-center">
        <div className="flex items-center border rounded-full w-full bg-white shadow-md">
          <Search className="ml-2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Хайх..."
            className="pl-2 pr-4 py-2 border-none w-full focus:outline-none rounded-full"
          />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2 px-4">
        <NavUser user={user} />
      </div>
    </header>
  );
};

export default TelHeader;
