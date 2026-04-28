import heroBg from "@/assets/hero-bg.jpg";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  onOpenModal?: () => void;
}

const HeroSection = ({ onOpenModal }: HeroSectionProps) => {

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding pt-24 sm:pt-28 md:pt-32">
      
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* Glow Effect - Responsive */}
      <div className="absolute top-1/3 sm:top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 sm:w-96 sm:h-96 md:w-[600px] md:h-[600px] rounded-full bg-primary/10 blur-[80px] sm:blur-[100px] md:blur-[120px] animate-pulse-glow" />

      <div className="relative z-10 text-center max-w-3xl mx-auto px-2 sm:px-4">
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6">
          Empowering Businesses with Smart ERP & Webb
        </h1>

        <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
          The all-in-one Enterprise Resource Solution that helps you manage sales, inventory, customers, and grow your business exponentially.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-0 sm:mb-0">
          <a
          href="#contact"
          className="bg-primary px-6 py-3 rounded text-black font-bold"
        >
          Contact Now
        </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;