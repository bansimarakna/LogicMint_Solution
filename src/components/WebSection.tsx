import { CheckCircle } from "lucide-react";
import WebImg from "@/assets/Website.jpg";

const bullets = [
  "Present your business in a professional way",
  "Attract new clients with clear service details",
  "Highlight your portfolio and achievements",
  "Generate leads with smart contact forms",
  "Seamless social media integration",
  "Optimized for mobile and tablet devices",
];

const WebSection = () => (
  <section id="about" className="section-padding gradient-bg">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div data-aos="fade-right" data-aos-duration="1000">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Website Development Services <span className="glow-text">for Businesses</span>
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
        <div 
          className="glass-card p-2 rounded-2xl"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <img
            src={WebImg}
            alt="Cybersecurity instructor"
            className="w-full rounded-xl object-cover aspect-[4/5]"
          />
        </div>
      </div>
    </div>
  </section>
);

export default WebSection;
