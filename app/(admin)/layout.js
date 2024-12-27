"use client";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Layout({ children }) {
  const isMobile = useIsMobile();
  return (
      <ProtectedRoute>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <main>
              {isMobile && <SidebarTrigger className="fixed top-3 left-3 w-10 h-10"/>}
              <div className="w-[80%] mx-auto mt-10">{children}</div>
            </main>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
  );
}
