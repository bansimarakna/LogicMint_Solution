import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS for scroll animations
AOS.init({
  duration: 1000,
  once: false, // Animations replay every time element enters viewport
  offset: 100,
  easing: "ease-in-out",
  mirror: true, // Reverse animation when scrolling back up
  anchorPlacement: "top-bottom",
});

createRoot(document.getElementById("root")!).render(<App />);
