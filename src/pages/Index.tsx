import { useState } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ERPSection from "@/components/ERPSection";
import WebSection from "@/components/WebSection";
import ERPFeatures from "@/components/ERPFeatures";
import WebsiteOffers from "@/components/WebsiteOffers";
// add reviews section testimonialssection
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
// import LeadCaptureModal from "@/components/LeadCaptureModal";
// import DownloadButton from "@/components/download";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Loader />
      <Navbar />
      <HeroSection onOpenModal={() => setModalOpen(true)} />
      <ERPSection />
      <WebSection />
      <ERPFeatures />
      <WebsiteOffers />
      <FAQSection />
      <ContactSection />
      {/* <DownloadButton/> */}
      <FooterSection />
      {/* <LeadCaptureModal open={modalOpen} onClose={() => setModalOpen(false)} /> */}

      {/* Floating CTA for modal */}
      
    </div>
  );
};

export default Index;
