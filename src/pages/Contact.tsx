import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Mail, MessageSquare, Phone } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      // Use relative path for API calls on same domain, fallback to env var
      const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;
      const endpoint = apiUrl.includes("localhost") 
        ? `${apiUrl}/api/send-mail` 
        : `${window.location.origin}/api/send-mail`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse({ type: "success", message: "Message sent successfully! We'll get back to you soon." });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setResponse({ type: "error", message: data.message || "Failed to send message" });
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse({ type: "error", message: "Server is not responding. Make sure backend is running!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="min-h-[calc(100vh-80px)] pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Get in <span className="glow-text">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <div className="glass-card p-8 rounded-2xl border border-primary/20 hover:border-primary/50 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <Mail className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">Email</h3>
              </div>
              <p className="text-muted-foreground">logicmint.solution@gmail.com</p>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-primary/20 hover:border-primary/50 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <MessageSquare className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">WhatsApp</h3>
              </div>
              <p className="text-muted-foreground">+91 XXXXX XXXXX</p>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-primary/20 hover:border-primary/50 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <Phone className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">Phone</h3>
              </div>
              <p className="text-muted-foreground">+91 XXXXX XXXXX</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto glass-card p-8 sm:p-12 rounded-2xl border border-primary/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this about?"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Your message here..."
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              {response && (
                <div
                  className={`p-4 rounded-lg ${
                    response.type === "success"
                      ? "bg-green-500/20 border border-green-500/50 text-green-700"
                      : "bg-red-500/20 border border-red-500/50 text-red-700"
                  }`}
                >
                  {response.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="glow-button w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
