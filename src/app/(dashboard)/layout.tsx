"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import NextDynamic from "next/dynamic";

const DashboardNavbar = NextDynamic(
  () => import("@/modules/dashboard/ui/components/Dashboard-Navbar").then(m => m.DashboardNavbar),
  { ssr: false }
);
const DashboardSidebar = NextDynamic(
  () => import("@/modules/dashboard/ui/components/Dashboard-Sidebar").then(m => m.DashboardSidebar),
  { ssr: false }
);

export const dynamic = 'force-dynamic';

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
