import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import TelHeader from "./header";
import TeleSidebar from "./sidebar";
import { Layout } from 'antd';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;


export default function TelLayout({ children }) {
  useEffect(() => {
    checkToken()
  }, [])
  const navigate = useNavigate()
  const checkToken = () => {
    const token = localStorage.getItem('token')
    if (!token) navigate('/login')
  }
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
