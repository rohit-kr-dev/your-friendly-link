import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import StatCard from "@/components/StatCard";
import TopAgents from "@/components/TopAgents";
import RecentActivities from "@/components/RecentActivities";
import QuickActions from "@/components/QuickActions";
import { DollarSign, Users, FileText, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 px-8 pb-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
            <p className="text-muted-foreground text-sm mt-1">Welcome back! Here's what's happening today.</p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-5 mb-6">
            <StatCard
              title="Total Revenue"
              value="$284,500"
              subtitle="+2.5% from last month"
              icon={
                <div className="h-10 w-10 rounded-lg bg-sidebar-primary/10 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-sidebar-primary" />
                </div>
              }
            />
            <StatCard
              title="Active Agents"
              value="0"
              subtitle="0 total"
              subtitleColor="text-muted-foreground"
              icon={
                <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-accent-foreground" />
                </div>
              }
            />
            <StatCard
              title="Properties Listed"
              value="0"
              subtitle="From Firestore"
              subtitleColor="text-stat-green"
              icon={
                <div className="h-10 w-10 rounded-lg bg-stat-green/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-stat-green" />
                </div>
              }
            />
            <StatCard
              title="Conversion Rate"
              value="24.8%"
              subtitle="+2.3% increase"
              icon={
                <div className="h-10 w-10 rounded-lg bg-stat-orange/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-stat-orange" />
                </div>
              }
            />
          </div>

          {/* Agents & Activities */}
          <div className="flex gap-5 mb-6">
            <TopAgents />
            <RecentActivities />
          </div>

          {/* Quick Actions */}
          <QuickActions />
        </main>
      </div>
    </div>
  );
};

export default Index;
