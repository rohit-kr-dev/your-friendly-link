import { Bell, ChevronDown, Settings, User, Shield, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useNavigate } from "react-router-dom";

const roles = ["Admin", "Manager", "Agent", "Viewer"];

const TopBar = () => {
  const { data, setUserRole } = useWorkspace();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-end gap-4 px-8 py-4">
      <div className="relative">
        <Bell className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
        <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-sidebar-primary text-[9px] font-bold flex items-center justify-center text-primary-foreground">
          {data.leads.filter((l) => l.status === "new").length || 0}
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-stat-green text-primary-foreground text-sm font-semibold">JS</AvatarFallback>
            </Avatar>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground leading-tight">John Smith</p>
              <Badge className="bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0 rounded">{data.userRole}</Badge>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/workspace")}>
            <Settings className="mr-2 h-4 w-4" /> Workspace
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/")}>
            <User className="mr-2 h-4 w-4" /> Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs text-muted-foreground">Switch Role</DropdownMenuLabel>
          {roles.map((role) => (
            <DropdownMenuItem key={role} onClick={() => setUserRole(role)} className={data.userRole === role ? "bg-secondary" : ""}>
              <Shield className="mr-2 h-4 w-4" /> {role}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" /> Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default TopBar;
