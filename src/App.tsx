import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
import Index from "./pages/Index";
import Financial from "./pages/Financial";
import AgentPerformance from "./pages/AgentPerformance";
import Analytics from "./pages/Analytics";
import LeadsCRM from "./pages/LeadsCRM";
import Properties from "./pages/Properties";
import Marketing from "./pages/Marketing";
import Workspace from "./pages/Workspace";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WorkspaceProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/financial" element={<Financial />} />
            <Route path="/agent-performance" element={<AgentPerformance />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/leads-crm" element={<LeadsCRM />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WorkspaceProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
