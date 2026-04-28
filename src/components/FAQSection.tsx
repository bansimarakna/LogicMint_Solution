import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "What services do you offer?", a: "We provide website development, ERP solutions, and custom web applications for businesses." },
  { q: "How long does it take to build a website?", a: "It usually takes 4-5 weeks depending on the complexity and requirements." },
  { q: "Do you develop custom ERP systems?", a: "Yes, we build fully customized ERP solutions based on your business needs." },
  { q: "What is the cost of your services?", a: "Pricing depends on project requirements. Contact us for a customized quote." },
  { q: "How can I contact you?", a: "You can reach us through the contact form or Email/WhatsApp us directly." },
];

const FAQSection = () => (
  <section id="faq" className="section-padding gradient-bg">
    <div className="container mx-auto max-w-3xl">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Frequently Asked <span className="glow-text">Questions</span>
      </h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="glass-card border px-6 rounded-xl">
            <AccordionTrigger className="text-left font-semibold hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
