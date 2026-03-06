import { Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const TopBar = () => {
  return (
    <header className="flex items-center justify-end gap-4 px-8 py-4">
      <div className="relative">
        <Bell className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
        <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-sidebar-primary text-[9px] font-bold flex items-center justify-center text-primary-foreground">
          1
        </span>
      </div>
      <div className="flex items-center gap-2 cursor-pointer">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-stat-green text-primary-foreground text-sm font-semibold">JS</AvatarFallback>
        </Avatar>
        <div className="text-right">
          <p className="text-sm font-semibold text-foreground leading-tight">John Smith</p>
          <Badge className="bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0 rounded">Admin</Badge>
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </div>
    </header>
  );
};

export default TopBar;
