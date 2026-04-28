import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = ["Home", "About", "Features", "FAQ", "Contact"];
const getHref = (link: string) => (link === "Home" ? "#" : `#${link.toLowerCase()}`);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Theme Logic
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setIsDark(false);
    }
  }, []);

  // Scroll Logic
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card border-b py-2 bg-background/80 backdrop-blur-md" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo - Left Side */}
        <a href="#" className="flex items-center hover:opacity-80 transition-opacity">
          <img src={logo} alt="LogicMint" className="h-20 w-auto object-contain" />
        </a>

        {/* Desktop Menu - Right Side */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((l) => (
              <a
                key={l}
                href={getHref(l)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
          
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Toggle - Right Side */}
        <div className="flex md:hidden items-center gap-3">
          <button onClick={toggleTheme} className="p-2 text-muted-foreground">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 text-foreground transition-all"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full glass-card border-b bg-background/95 backdrop-blur-xl transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-4 gap-4">
          {navLinks.map((l) => (
            <a
              key={l}
              href={getHref(l)}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;