import {
  Shield,
  Users,
  Boxes,
  ShoppingCart,
  BarChart3,
  Database
} from "lucide-react";

const skills = [
  { icon: Shield, title: "Security" },
  { icon: Users, title: "User & Role Management" },
  { icon: Boxes, title: "Inventory Management" },
  { icon: ShoppingCart, title: "Sales & Purchase" },
  { icon: BarChart3, title: "Reports & Analytics" },
  { icon: Database, title: "Centralized Database" },
];

const ERPFeatures = () => (
  <section id="features" className="section-padding">
    <div className="container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Key Features of Our <span className="glow-text">ERP Software Solution</span>
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map(({ icon: Icon, title }) => (
          <div key={title} className="glass-card-hover p-6 text-center">
            <Icon className="mx-auto mb-4 text-primary" size={40} />
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ERPFeatures;
