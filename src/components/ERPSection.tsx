import { CheckCircle } from "lucide-react";
import ERPImg from "@/assets/ERP.jpg";

const bullets = [
  "Advanced secure login system",
  "Role-based access control",
  "Efficient customer management",
  "Real-time inventory tracking",
  "Smart order and billing management",
];

const ERPSection = () => (
  <section id="about" className="section-padding gradient-bg">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div 
          className="glass-card p-2 rounded-2xl"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <img
            src={ERPImg}
            alt="Cybersecurity instructor"
            className="w-full rounded-xl object-cover aspect-[4/5]"
          />
        </div>
        <div data-aos="fade-left" data-aos-duration="1000">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            ERP Software Features for <span className="glow-text">Business Management</span>
          </h2>
          <ul className="space-y-4 stagger-children">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-lg text-muted-foreground">
                <CheckCircle className="text-primary shrink-0" size={22} />
                {b}
              </li> 
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default ERPSection;
