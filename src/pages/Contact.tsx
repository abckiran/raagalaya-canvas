import { useState } from "react";
import { z } from "zod";
import { Mail, MapPin, Facebook, Instagram, Youtube, Send } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  interest: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Please share a few words").max(2000),
  "bot-field": z.string().max(0).optional(),
});

const Contact = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Vocal",
    message: "",
    "bot-field": "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({
        title: "Please check the form",
        description: parsed.error.issues[0]?.message ?? "Invalid input",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const { name, email, phone, interest, message } = parsed.data;
    const resetForm = () =>
      setForm({ name: "", email: "", phone: "", interest: "Vocal", message: "", "bot-field": "" });

    try {
      const body = new URLSearchParams({
        "form-name": "contact",
        "bot-field": form["bot-field"],
        name,
        email,
        phone: phone || "",
        interest: interest || "",
        message,
      });
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (res.ok) {
        toast({
          title: "Message sent",
          description: "Thank you for writing to us — we'll be in touch soon.",
        });
        resetForm();
      } else {
        toast({
          title: "Couldn't send your message",
          description: `Server responded ${res.status}. Please try again, or email us directly.`,
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Couldn't send your message",
        description: "Please check your connection and try again, or email us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="py-10 md:py-14">
        <div className="container">
          <SectionHeader
            eyebrow="Contact"
            title="We'd love to hear from you."
            description="Whether you're interested in classes, performances, or simply want to share a kind word — write to us below."
          />
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={onSubmit}
            className="lg:col-span-3 space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            {/* honeypot — hidden from humans, fills in only for bots */}
            <input
              type="text"
              name="bot-field"
              tabIndex={-1}
              autoComplete="off"
              value={form["bot-field"]}
              onChange={onChange}
              aria-hidden="true"
              className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
            />
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Name" name="name" value={form.name} onChange={onChange} required />
              <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Phone (optional)" name="phone" value={form.phone} onChange={onChange} />
              <div>
                <label className="eyebrow block mb-2">Interest</label>
                <select
                  name="interest"
                  value={form.interest}
                  onChange={onChange}
                  className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-accent transition-colors"
                >
                  <option>Vocal</option>
                  <option>General enquiry</option>
                </select>
              </div>
            </div>
            <div>
              <label className="eyebrow block mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                required
                rows={5}
                className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Tell us a little about yourself…"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 text-sm tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {submitting ? "Sending…" : <>Send message <Send size={14} /></>}
            </button>
          </form>

          {/* Sidebar */}
          <aside className="lg:col-span-2 space-y-8 lg:pl-10 lg:border-l lg:border-border">
            <Info Icon={MapPin} title="Visit">
              Raagalaya Academy Studio<br />Santa Clara, California
            </Info>
            <Info Icon={Mail} title="Email">
              <a href="mailto:raagalaya.academy@gmail.com" className="hover:text-accent transition-colors">
                raagalaya.academy@gmail.com
              </a>
            </Info>
            <div>
              <p className="eyebrow mb-3">Follow</p>
              <div className="flex gap-3">
                {[
                  { Icon: Facebook, href: "https://www.facebook.com/p/Raagalaya-Academy-100063662845330/", label: "Facebook" },
                  { Icon: Instagram, href: "https://www.instagram.com/raagalayaacademy/", label: "Instagram" },
                  { Icon: Youtube, href: "https://www.youtube.com/@RaagalayaAcademy", label: "YouTube" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid place-items-center h-10 w-10 border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

const Field = ({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="eyebrow block mb-2">{label}</label>
    <input
      {...props}
      className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-accent transition-colors"
    />
  </div>
);

const Info = ({
  Icon,
  title,
  children,
}: {
  Icon: React.ComponentType<any>;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex gap-4">
    <div className="mt-0.5 text-accent">
      <Icon size={18} />
    </div>
    <div>
      <p className="eyebrow mb-1">{title}</p>
      <p className="text-muted-foreground leading-relaxed text-sm">{children}</p>
    </div>
  </div>
);

export default Contact;
