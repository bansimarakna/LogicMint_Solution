import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const ContactSection = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Form mathi data collect karo
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch("https://www.logicmint.solutions/api/send-mail ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Thank you! Your message has been sent to LogicMint Solutions.");
        e.target.reset(); // Form clear karva mate
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server is not responding. Make sure backend is running!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-background text-foreground">
      <div className="container mx-auto px-3 sm:px-4">
        <div 
          className="text-center mb-8 sm:mb-12"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
            LET'S <span className="text-primary glow-text">CONNECT</span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-base text-muted-foreground mt-3 sm:mt-4">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </div>

        {/* <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 max-w-6xl mx-auto"> */}
          {/* --- Left Side: Info Cards --- */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto stagger-children">
  
  {/* Email Card - Clickable */}
  <a 
  href="https://mail.google.com/mail/?view=cm&fs=1&to=logicmint.solution@gmail.com&su=Inquiry from Website&body=Hello LogicMint Team,I am interested in your services."
  target="_blank"
  rel="noopener noreferrer"
  className="glass-card p-4 sm:p-6 flex items-center gap-3 sm:gap-4 border-l-4 border-primary hover:bg-primary/10 transition-all cursor-pointer"
  data-aos="flip-left"
  data-aos-duration="800"
>
  <Mail className="text-primary flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
  <div className="text-left min-w-0">
    <p className="text-xs text-muted-foreground uppercase">Email</p>
    <p className="font-medium text-sm sm:text-base truncate">
      logicmint.solution@gmail.com
    </p>
  </div>
</a>

  {/* WhatsApp Card - Clickable */}
  <a 
    href="https://wa.me/919173273899?text=Hi, I am interested in your services." 
    target="_blank" 
    rel="noopener noreferrer"
    className="glass-card p-4 sm:p-6 flex items-center gap-3 sm:gap-4 border-l-4 border-primary hover:bg-primary/5 transition-all"
    data-aos="flip-left"
    data-aos-duration="800"
    data-aos-delay="100"
  >
    <Phone className="text-primary flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
    <div className="text-left">
      <p className="text-xs text-muted-foreground uppercase">WhatsApp</p>
      <p className="font-medium text-sm sm:text-base">+91 91732 73899</p>
    </div>
  </a>

  {/* Address Card */}
  <div 
    className="glass-card p-4 sm:p-6 flex items-center gap-3 sm:gap-4 border-l-4 border-primary"
    data-aos="flip-left"
    data-aos-duration="800"
    data-aos-delay="200"
  >
    <MapPin className="text-primary flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
    <div className="text-left">
      <p className="text-xs text-muted-foreground uppercase">Address</p>
      <p className="font-medium text-sm sm:text-base">Rajkot, Gujarat, India</p>
    </div>
  </div>
</div>

{/* --- Additional Information --- */}
<div 
  className="text-center mt-8"
  data-aos="fade-up"
  data-aos-duration="800"
  data-aos-delay="300"
>
  <p className="text-sm text-muted-foreground italic">
    * We typically respond to all inquiries within **24 hours**.
  </p>
</div>

          {/* --- Right Side: Contact Form --- */}
          {/* <div className="glass-card p-4 sm:p-6 md:p-8 relative border border-primary/20">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 text-left">
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase text-muted-foreground">Your Name</label>
                  <input name="name" type="text" placeholder="John Doe" className="w-full bg-background/50 border border-primary/20 p-2 sm:p-3 rounded focus:border-primary outline-none transition-all text-sm" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase text-muted-foreground">Email Address</label>
                  <input name="email" type="email" placeholder="john@example.com" className="w-full bg-background/50 border border-primary/20 p-2 sm:p-3 rounded focus:border-primary outline-none transition-all text-sm" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase text-muted-foreground">Subject</label>
                <input name="subject" type="text" placeholder="Project Discussion" className="w-full bg-background/50 border border-primary/20 p-2 sm:p-3 rounded focus:border-primary outline-none transition-all text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase text-muted-foreground">Message</label>
                <textarea name="message" rows={4} placeholder="Tell me about your project..." className="w-full bg-background/50 border border-primary/20 p-2 sm:p-3 rounded focus:border-primary outline-none transition-all resize-none text-sm" required></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 sm:py-4 bg-primary/10 border border-primary hover:bg-primary hover:text-black transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-widest disabled:opacity-50 text-xs sm:text-sm"
              >
                <Send size={16} /> {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div> */}
        {/* </div> */}
      </div>
    </section>
  );
};

export default ContactSection;