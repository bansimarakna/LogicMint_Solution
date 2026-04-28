import {
  CheckSquare,
  Settings,
  Boxes,
  Users,
  ShoppingCart,
  Truck,
  Factory,
  LayoutDashboard
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Settings, label: "Config" },
  { icon: Boxes, label: "Catalog" },
  { icon: Users, label: "Entities" },
  { icon: ShoppingCart, label: "Sales" },
  { icon: Truck, label: "Purchase" },
  { icon: Factory, label: "Production" },
];

const completedModules = [
  "User & Permission Setup",
  "Item & GST Configuration",
  "Vendor & Customer Setup",
  "Sales Order & Invoice",
  "Purchase Flow (PO → GRN → Invoice)",
];

const DashboardPreview = () => (
  <section id="dashboard" className="section-padding">
    <div className="container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        LogicMint Solution <span className="glow-text">Dashboard</span>
      </h2>
      <div className="glass-card overflow-hidden rounded-2xl max-w-5xl mx-auto">
        <div className="flex min-h-[400px]">
          {/* Sidebar */}
          <div className="hidden md:flex flex-col w-56 border-r border-border/50 p-4 gap-1">
            <span className="text-sm font-bold glow-text mb-4 px-3">LogicMint Solution</span>
            {sidebarItems.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  label === "Video Lessons"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={16} />
                {label}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-6">
            <h3 className="font-semibold mb-4">Sales Module Overview</h3>
            {/* Video placeholder */}
            <div className="glass-card rounded-xl p-6 flex flex-col gap-3 mb-6">
              <span className="text-sm text-muted-foreground">Sales Flow</span>
              <ul className="text-sm space-y-1">
                <li>• Create Sales Order</li>
                <li>• Dispatch Order</li>
                <li>• Generate Invoice</li>
              </ul>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-semibold glow-text">70%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary w-[70%] transition-all" />
              </div>
            </div>

            {/* Completed */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Completed Modules</h4>
              <div className="space-y-2">
                {completedModules.map((m) => (
                  <div key={m} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckSquare className="text-primary" size={16} />
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DashboardPreview;

