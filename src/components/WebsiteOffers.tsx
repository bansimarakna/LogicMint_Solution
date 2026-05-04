const programs = [
  {
    title: "Professional Website",
    items: [
      "Modern and attractive design",
      "Mobile-friendly layout",
      "Easy navigation experience",
    ],
  },
  {
    title: "Lead Generation",
    items: [
      "Contact forms for inquiries",
      "Call-to-action integration",
      "Social media connectivity",
    ],
  },
  {
    title: "Business Growth",
    items: [
      "SEO optimization",
      "High performance speed",
      "Secure and reliable system",
    ],
  },
];

const ProgramsSection = () => (
  <section id="courses" className="section-padding gradient-bg">
    <div className="container mx-auto">
      <h2 
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        Professional Business <span className="glow-text">Website Development Services</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-6 stagger-children">
        {programs.map((p) => (
          <div
            key={p.title}
            className="glass-card-hover p-8 flex flex-col"
            data-aos="zoom-in-up"
            data-aos-duration="800"
          >
            <h3 className="text-xl font-bold mb-4 glow-text">{p.title}</h3>
            <ul className="space-y-2 text-muted-foreground">
              {p.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProgramsSection;
