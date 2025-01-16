"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { useState } from "react";
import {
  LogOut,
  LayoutDashboard,
  Book,
  ChevronDown,
  LucideHome,
  MessageCircleHeart,
  UsersRound,
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { Separator } from "./ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

// Menu items.
const items = [
  {
    menuTitle: "Home Page",
    icon: <LucideHome />,
    subItems: [
      {
        title: "Banner",
        link: "/homepage/banner"
      },
      {
        title: "Blocks",
        link: "/homepage/blocks"
      }
    ]
  },
  {
    menuTitle: "Publications",
    icon: <Book />,
    subItems: [
      {
        title: "Magazines",
        link: "/publications/magazines"
      },
      {
        title: "Anthologies",
        link: "/publications/anthologies"
      },
      {
        title: "Articles",
        link: "/publications/articles"
      }
    ]
  },
  {
    menuTitle: "Club Talk",
    icon: <MessageCircleHeart />,
    subItems: [
      {
        title: "Testimonials",
        link: "/club-talk/testimonials"
      }
    ]
  },
  {
    menuTitle: "About Us",
    icon: <UsersRound />,
    subItems: [
      {
        title: "Info Sections",
        link: "/about-us/info-sections"
      },
      {
        title: "Members",
        link: "/about-us/members"
      }
    ]
  }
];

export function AppSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const isMobile = useIsMobile();
  const [logoutDiaglog, setLogoutDialog] = useState(false);
  const router = useRouter();
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
                <SidebarMenuItem className="h-10">
                  <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                    <Link href="/dashboard">
                      <LayoutDashboard />
                      <span className="text-base">Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {items.map((item, i) => (
                  <Collapsible key={i} defaultOpen className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          {item.icon}
                          <span>{item.menuTitle}</span>
                          <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                      {item.subItems.map((subitem, i) => (
                        <SidebarMenuSub key={i}>
                          <SidebarMenuSubItem>
                            <SidebarMenuButton asChild isActive={pathname === subitem.link}>
                              <Link href={subitem.link}>
                                <span>{subitem.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      ))}
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
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
          onConfirm={() => {
            logout();
            router.push("/login");
          }}
          title="Confirm Logout"
          message={`Are you sure you want to logout?`}
          submitting={false}
        />
      )}
    </>
  );
}
