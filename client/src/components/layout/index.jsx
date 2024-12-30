import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import TelHeader from "./header";
import TeleSidebar from "./sidebar";
import { Layout } from 'antd';

const { Content } = Layout;


export default function TelLayout({ children }) {
  return (
    <div class="flex justify-start max-w-[1800px] mx-auto">
      <SidebarProvider>
        <TeleSidebar />
        <SidebarInset>
          <TelHeader />
          <Content>{children}</Content>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
