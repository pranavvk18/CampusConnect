
import { Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { BellIcon, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  // Mock user data - would come from auth context in a real app
  const user = {
    name: "Student Name",
    usn: "1AB22CS001",
    avatar: "",
  };

  return (
    <header className="border-b px-4 py-3 flex items-center justify-between bg-white">
      <div className="flex items-center">
        <SidebarTrigger />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative p-1 flex items-center gap-2 hover:bg-slate-50">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-socse-light text-white">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col text-left text-sm">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.usn}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56">
            <div className="p-2">
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.usn}</div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="cursor-pointer">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="cursor-pointer">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/logout" className="cursor-pointer text-red-500 font-medium">
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
