import { Plus } from "lucide-react";

const actions = [
  { label: "Add Property" },
  { label: "Create Lead" },
  { label: "Add Agent" },
];

const QuickActions = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-4">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex items-center justify-center gap-2 bg-accent text-accent-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity text-sm"
          >
            <Plus className="h-4 w-4" />
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
