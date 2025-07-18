"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardUserBotton } from "./Dashboard-User-Botton";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agent",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  // const pathname = "/agents";

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex   items-center gap-3 p-2">
          <Image src="/logo.svg" height={36} width={36} alt="callsage" />
          <p className="text-2xl font-semibold ">CallSage</p>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="opacity-10 text-[#5d6b68] " />
      </div>
      <SidebarContent>
        {/* first section  */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 hover:bg-linear-to-r/oklch border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 ",
                      pathname === item.href &&
                        "bg-linear-to-r/oklch  border-[#5D6B68]/10 "
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href} className="flex items-center gap-2 ">
                      <item.icon className="size-4" />
                      <span className="text-sm tracking-tighter">
                        {" "}
                        {item.label}{" "}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* second section  */}
        <div className="px-4 py-2">
          <Separator className="opacity-10 text-[#5d6b68] " />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 hover:bg-linear-to-r/oklch border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 ",
                      pathname === item.href &&
                        "bg-linear-to-r/oklch  border-[#5D6B68]/10 "
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href} className="flex items-center gap-2 ">
                      <item.icon className="size-4" />
                      <span className="text-sm tracking-tighter">
                        {" "}
                        {item.label}{" "}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <DashboardUserBotton/>
      </SidebarFooter>
    </Sidebar>
  );
};
