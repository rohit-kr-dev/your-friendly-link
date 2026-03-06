import { Skeleton } from "@/components/ui/skeleton";

const RecentActivities = () => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 flex-1">
      <h3 className="text-lg font-semibold text-card-foreground mb-5">Recent Activities</h3>
      <div className="space-y-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="h-2.5 w-2.5 rounded-full mt-1.5 shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-2.5 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
