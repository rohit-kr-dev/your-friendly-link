import { Skeleton } from "@/components/ui/skeleton";

const TopAgents = () => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 flex-1">
      <h3 className="text-lg font-semibold text-card-foreground mb-5">Top Performing Agents</h3>
      <div className="space-y-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-2.5 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopAgents;
