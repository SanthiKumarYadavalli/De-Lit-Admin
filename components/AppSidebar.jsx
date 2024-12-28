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
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { useState } from "react";
import {
  Home,
  LogOut,
  LayoutDashboard,
  Book,
  BookOpen,
  ChevronDown,
  FileText,
} from "lucide-react";
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
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <span>Publications</span>
                        <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a href="/admin/magazines">
                              <Book className="mr-2 h-4 w-4" />
                              <span>Magazines</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a href="/admin/anthologies">
                              <BookOpen className="mr-2 h-4 w-4" />
                              <span>Anthologies</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a href="/admin/articles">
                              <FileText className="mr-2 h-4 w-4" />
                              <span>Articles</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
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
