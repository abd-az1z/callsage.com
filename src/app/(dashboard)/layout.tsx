import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/Dashboard-Navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/Dashboard-Sidebar";

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col h-screen w-screen bg-muted ">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};
export default layout;
