"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { Contact, Home, Inbox, LogOut, ChartLine, LayoutDashboard } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { Separator } from "./ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Home Page",
    url: "/homepage",
    icon: Home,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const isMobile = useIsMobile();
  const [logoutDiaglog, setLogoutDialog] = useState(false);
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          {isMobile && (
            <div className="flex items-end justify-end mr-2 mt-2">
              <SidebarTrigger />
            </div>
          )}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-12">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className="w-8 h-8 mr-2"
                  />
                  <span>De-Lit Admin</span>
                </Avatar>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <Separator orientation="horizontal" className="my-2" />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className="h-10">
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon />
                        <span className="text-base">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <Separator orientation="horizontal" className="my-2" />
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    onClick={() => setLogoutDialog(true)}
                  >
                    <button>
                      <LogOut />
                      <span>Logout</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {logoutDiaglog && (
        <ConfirmationDialog
          isOpen={logoutDiaglog}
          onClose={() => setLogoutDialog(false)}
          onConfirm={() => logout()}
          title="Confirm Logout"
          message={`Are you sure you want to logout?`}
          submitting={false}
        />
      )}
    </>
  );
}
