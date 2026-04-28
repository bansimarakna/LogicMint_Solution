import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-border/50 py-12 px-4">
      <div className="container mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <span className="text-lg font-bold glow-text">LogicMint Solution</span>
          <p className="text-sm text-muted-foreground mt-2">
           We build modern websites and powerful ERP solutions to grow your business.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
            <li><a href="#features" className="hover:text-primary transition-colors">Services</a></li>
            <li>
              <a 
                href="https://wa.me/919173273899?text=Hello%20I%20am%20interested%20in%20your%20services"
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Website Development</li>
            <li>ERP Software Solutions</li>
          </ul>
        </div>
      
      </div>
      <div className="container mx-auto mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        © 2026 LogicMint Solution. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

