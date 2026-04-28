import { useEffect, useState } from "react";

const Loader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("hasVisited");
    
    if (hasVisited) {
      setShow(false);
    } else {
      // Mark as visited and show loader for 2.5 seconds
      localStorage.setItem("hasVisited", "true");
      const timer = setTimeout(() => {
        setShow(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8 animate-pulse">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-primary/50 rounded-xl flex items-center justify-center">
            <span className="text-4xl font-bold text-background">LM</span>
          </div>
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>

        {/* Loading Text */}
        <p className="text-sm font-semibold text-muted-foreground">LogicMint Solution</p>
      </div>
    </div>
  );
};

export default Loader;
