import { LayoutDashboard, DollarSign, Users, BarChart3, UserCheck, Building2, Send, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: DollarSign, label: "Financial", path: "/financial" },
  { icon: Users, label: "Agent Performance", path: "/agent-performance" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: UserCheck, label: "Leads & CRM", path: "/leads-crm" },
  { icon: Building2, label: "Properties", path: "/properties" },
  { icon: Send, label: "Marketing", path: "/marketing" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-[200px] min-h-screen bg-card border-r border-border flex flex-col shrink-0">
      <div className="flex items-center gap-2 px-5 py-5">
        <Building2 className="h-5 w-5 text-sidebar-primary" />
        <span className="font-bold text-foreground text-base">RealEstate CRM</span>
      </div>

      <nav className="flex-1 px-3 mt-2">
        <p className="text-xs font-medium text-muted-foreground px-3 mb-2 uppercase tracking-wider">Main Menu</p>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-secondary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
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
