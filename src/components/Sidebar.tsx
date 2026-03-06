import { LayoutDashboard, DollarSign, Users, BarChart3, UserCheck, Building2, Send, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: DollarSign, label: "Financial", active: false },
  { icon: Users, label: "Agent Performance", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: UserCheck, label: "Leads & CRM", active: false },
  { icon: Building2, label: "Properties", active: false },
  { icon: Send, label: "Marketing", active: false },
];

const Sidebar = () => {
  return (
    <aside className="w-[200px] min-h-screen bg-card border-r border-border flex flex-col">
      <div className="flex items-center gap-2 px-5 py-5">
        <Building2 className="h-5 w-5 text-sidebar-primary" />
        <span className="font-bold text-foreground text-base">RealEstate CRM</span>
      </div>

      <nav className="flex-1 px-3 mt-2">
        <p className="text-xs font-medium text-muted-foreground px-3 mb-2 uppercase tracking-wider">Main Menu</p>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  item.active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-5 py-4 border-t border-border">
        <button className="flex items-center gap-3 text-sm text-sidebar-foreground hover:text-foreground transition-colors">
          <UsersRound className="h-4 w-4" />
          Teams
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
