import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Facebook, Instagram, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/classes", label: "Classes" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const socials = [
  { href: "https://www.facebook.com/p/Raagalaya-Academy-100063662845330/", label: "Facebook", Icon: Facebook },
  { href: "https://www.instagram.com/raagalayaacademy/", label: "Instagram", Icon: Instagram },
  { href: "https://www.youtube.com/@RaagalayaAcademy", label: "YouTube", Icon: Youtube },
];

const Layout = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          "bg-background/95 backdrop-blur-md border-b",
          scrolled ? "border-border shadow-sm" : "border-border/60"
        )}
      >
        <div className="container flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Raagalaya Academy" className="h-11 w-11 object-contain shrink-0" />
            <span className="leading-tight">
              <span className="block font-serif text-xl text-primary">Raagalaya Academy</span>
              <span className="block eyebrow text-[10px]">Carnatic Vocal Music</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "text-sm tracking-wide transition-colors relative py-1",
                    isActive
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {n.label}
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px w-6 bg-accent" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            className="lg:hidden p-2 text-primary"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border bg-background animate-fade-in">
            <nav className="container py-6 flex flex-col gap-1">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "py-3 text-base border-b border-border/60 last:border-0",
                      isActive ? "text-primary" : "text-foreground/80"
                    )
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      <footer className="bg-primary text-primary-foreground mt-24">
        <div className="container py-16 grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="grid place-items-center h-10 w-10 rounded-sm bg-primary-foreground shrink-0">
                <img src={logo} alt="" className="h-8 w-8 object-contain" />
              </div>
              <span className="font-serif text-xl">Raagalaya Academy</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
              A sanctuary for Carnatic music — preserving the parampara,
              shaping the next generation of musicians.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] mb-4 text-primary-foreground/60">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-primary-foreground/80 hover:text-accent transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] mb-4 text-primary-foreground/60">
              Connect
            </h4>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Santa Clara, California
              <br />
              <a href="mailto:raagalaya.academy@gmail.com" className="hover:text-accent transition-colors">
                raagalaya.academy@gmail.com
              </a>
            </p>
            <div className="flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid place-items-center h-10 w-10 rounded-sm border border-primary-foreground/20 hover:bg-accent hover:border-accent transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10">
          <div className="container py-6 text-xs text-primary-foreground/50 flex flex-col md:flex-row justify-between gap-2">
            <p>© {new Date().getFullYear()} Raagalaya Academy. All rights reserved.</p>
            <p className="font-serif italic">"Music can make a difference."</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
