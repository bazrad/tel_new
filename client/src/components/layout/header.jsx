import React from "react";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { Search } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
const routes = [
  { path: "/", breadcrumb: "Home" },
  { path: "/station", breadcrumb: "Station" },
  { path: "/call", breadcrumb: "Call" },
  { path: "/client", breadcrumb: "Client" },
  { path: "/history", breadcrumb: "History" },
  { path: "/tariff", breadcrumb: "Tariff" },
  { path: "/payment", breadcrumb: "Payment" },
  { path: "/example", breadcrumb: "Test" },
  // { path: "/payment", breadcrumb: "Payment" },
];
const TelHeader = () => {
  const user = {
    name: "Bazarvaani",
    email: "bazrad13@gmail.com",
    avatar: "path/to/avatar.jpg",
  };
  const location = useLocation();

  // Split the current path into segments
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Map each segment to its corresponding route
  const breadcrumbItems = pathnames.map((_, index) => {
    const fullPath = `/${pathnames.slice(0, index + 1).join("/")}`;
    const route = routes.find((r) => r.path === fullPath);

    return route ? (
      <Breadcrumb.Item key={fullPath}>
        <Link to={fullPath}>{route.breadcrumb}</Link>
      </Breadcrumb.Item>
    ) : null;
  });
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 ">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <Breadcrumb.Item key="/">
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          {breadcrumbItems}
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
