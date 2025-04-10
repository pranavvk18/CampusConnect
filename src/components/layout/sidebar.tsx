
import { 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  ClipboardCheck, 
  Home, 
  LayoutDashboard, 
  LucideIcon, 
  MessageSquare, 
  Search, 
  Sparkles, 
  User2, 
  UserRound 
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
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

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  submenu?: { title: string; href: string }[];
}

const mainNav: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Electives",
    href: "/electives",
    icon: BookOpen,
  },
  {
    title: "Lost & Found",
    href: "/lost-found",
    icon: Search,
  },
  {
    title: "Clubs",
    href: "/clubs",
    icon: Sparkles,
  },
  {
    title: "Plagiarism Checker",
    href: "/plagiarism-checker",
    icon: ClipboardCheck,
  },
  {
    title: "Question Papers",
    href: "/question-papers",
    icon: Calendar,
  },
  {
    title: "Digital ID",
    href: "/digital-id",
    icon: UserRound,
  },
];

export function AppSidebar() {
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  return (
    <Sidebar>
      <SidebarHeader className="py-6 border-b border-sidebar-border/20">
        <div className="flex items-center px-4">
          <Logo className="text-white" textClassName="text-white" />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={cn(
                    isActive(item.href) && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}>
                    <Link to={item.href} className="flex items-center">
                      <item.icon className="w-5 h-5 mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border/20 py-4">
        <div className="px-3">
          <Link to="/settings" className="flex items-center p-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
            <User2 className="w-5 h-5 mr-2" />
            <span>Profile Settings</span>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
