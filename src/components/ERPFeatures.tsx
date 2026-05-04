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
      <h2 
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        ERP <span className="glow-text">Features</span>
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {skills.map(({ icon: Icon, title }) => (
          <div 
            key={title} 
            className="glass-card-hover p-6 text-center"
            data-aos="flip-up"
            data-aos-duration="800"
          >
            <Icon className="mx-auto mb-4 text-primary" size={40} />
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ERPFeatures;
