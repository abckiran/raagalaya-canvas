import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Music2, Award, Users, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import classesImg from "@/assets/classes-teaching.jpg";
import eventImg from "@/assets/events-concert.jpg";

const heroSlides = Array.from({ length: 14 }, (_, i) => `/images/carousel/opening-${String(i + 1).padStart(2, "0")}.jpg`);
const galleryPreview = [
  "/images/gallery/g04.jpg",
  "/images/gallery/g11.jpg",
  "/images/gallery/g15.jpg",
  "/images/gallery/g28.jpg",
];

const SLIDE_INTERVAL = 5500;

const HeroCarousel = () => {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % heroSlides.length);
    }, SLIDE_INTERVAL);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [paused]);

  const go = (delta: number) => setIdx((i) => (i + delta + heroSlides.length) % heroSlides.length);

  return (
    <section
      className="relative h-[calc(100svh-5rem)] min-h-[520px] w-full overflow-hidden bg-primary"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {heroSlides.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          width={1920}
          height={1280}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "auto"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/65 via-primary/45 to-primary/85" />

      <div className="relative h-full container flex flex-col justify-end pb-20 md:pb-28 text-primary-foreground">
        <div className="max-w-3xl animate-fade-up">
          <p className="eyebrow !text-primary-foreground/70 mb-6 flex items-center gap-3">
            <span className="gold-divider" />
            Carnatic Classical Music · Vocal
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.1] mb-5 max-w-3xl">
            Where every shruti is a step toward the divine.
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/80 max-w-xl leading-relaxed mb-8">
            A modern home for the timeless tradition of Carnatic music —
            guiding sincere students from their first sa-pa to the concert stage.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/classes"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 text-sm tracking-wide hover:bg-accent/90 transition-colors"
            >
              Explore classes <ArrowRight size={16} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-primary-foreground/40 px-7 py-3.5 text-sm tracking-wide hover:bg-primary-foreground/10 transition-colors"
            >
              Our parampara
            </Link>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous photograph"
        className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:grid place-items-center h-11 w-11 rounded-full bg-primary-foreground/15 hover:bg-accent text-primary-foreground border border-primary-foreground/25 transition-colors backdrop-blur-sm"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next photograph"
        className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:grid place-items-center h-11 w-11 rounded-full bg-primary-foreground/15 hover:bg-accent text-primary-foreground border border-primary-foreground/25 transition-colors backdrop-blur-sm"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`Show photograph ${i + 1}`}
            className={`h-1 transition-all duration-300 ${
              i === idx ? "w-8 bg-accent" : "w-3 bg-primary-foreground/40 hover:bg-primary-foreground/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

const Home = () => (
  <>
    <HeroCarousel />

    {/* VISION SNIPPET */}
    <section className="py-16 md:py-20">
      <div className="container">
        <SectionHeader
          eyebrow="Our Vision"
          title="To keep alive a 2000-year-old conversation between sound, devotion, and the soul."
          description="At Raagalaya Academy, we believe Carnatic music is not a relic to be admired — it is a living language. Our mission is to teach it the way it has always been taught: with patience, with discipline, and with deep reverence for the lineage that carries it forward."
        />
      </div>
    </section>

    {/* PILLARS */}
    <section className="py-20 bg-secondary/40 border-y border-border">
      <div className="container grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {[
          { Icon: Music2, title: "Authentic tradition", text: "Rooted in the guru-shishya parampara, taught aurally and patiently." },
          { Icon: Award, title: "Performance-ready", text: "From basic varisai to the arangetram stage, with care at every step." },
          { Icon: Users, title: "All ages welcome", text: "Children, adults, and rasikas — anyone who wishes to listen, learn, and sing." },
          { Icon: Sparkles, title: "In-person & online", text: "Live classes from our Santa Clara studio and across the world via video." },
        ].map(({ Icon, title, text }) => (
          <div key={title} className="text-center">
            <Icon className="mx-auto mb-5 text-accent" size={28} strokeWidth={1.4} />
            <h3 className="font-serif text-xl text-primary mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CLASSES TEASER */}
    <section className="py-16 md:py-20">
      <div className="container grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="aspect-[3/2] overflow-hidden">
          <img
            src={classesImg}
            alt="A traditional Carnatic vocal classroom"
            loading="lazy"
            width={1600}
            height={1200}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="eyebrow mb-4">Classes</p>
          <h2 className="font-serif text-2xl md:text-4xl text-primary leading-[1.1] mb-5">
            From your first sa, to your hundredth kriti.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Raagalaya Academy is a vocal Carnatic school. We guide students
            through voice culture, swara sadhana, varnams, kritis, and the
            art of manodharma — at beginner, intermediate, and advanced
            levels, each at the pace of their own sadhana.
          </p>
          <Link
            to="/classes"
            className="inline-flex items-center gap-2 text-primary border-b border-accent pb-1 hover:gap-3 transition-all"
          >
            View the curriculum <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>

    {/* EVENT TEASER */}
    <section className="py-16 md:py-20 bg-primary text-primary-foreground">
      <div className="container grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="order-2 md:order-1">
          <p className="eyebrow !text-primary-foreground/60 mb-4">Upcoming</p>
          <h2 className="font-serif text-2xl md:text-4xl leading-[1.1] mb-5">
            Sangeetha Tharangini 2026
          </h2>
          <p className="text-primary-foreground/75 leading-relaxed mb-8">
            A Carnatic music concert by our beginner-level students —
            showcasing their learning and a year of dedicated practice.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-accent border-b border-accent/60 pb-1 hover:gap-3 transition-all"
          >
            See full schedule <ArrowRight size={16} />
          </Link>
        </div>
        <div className="aspect-[4/3] overflow-hidden order-1 md:order-2">
          <img
            src={eventImg}
            alt="A traditional Carnatic concert stage with brass lamps"
            loading="lazy"
            width={1600}
            height={1100}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>

    {/* GALLERY PREVIEW */}
    <section className="py-16 md:py-20">
      <div className="container">
        <SectionHeader
          eyebrow="Gallery"
          title="A visual diary of our musical journey."
          className="mb-16"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {galleryPreview.map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden">
              <img
                src={src}
                alt={`Gallery moment ${i + 1}`}
                loading="lazy"
                width={1200}
                height={1200}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="h-full w-full object-cover select-none hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-primary border-b border-accent pb-1 hover:gap-3 transition-all"
          >
            View full gallery <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 md:py-20 bg-secondary/40 border-t border-border">
      <div className="container text-center max-w-2xl">
        <p className="eyebrow mb-5 flex items-center gap-3 justify-center">
          <span className="gold-divider" /> Begin your journey <span className="gold-divider" />
        </p>
        <h2 className="font-serif text-2xl md:text-4xl text-primary mb-5">
          The first lesson is the longest. Take it.
        </h2>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          Whether you are seeking your first guru or returning after years away
          from sadhana, we would be honoured to listen.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 text-sm tracking-wide hover:bg-primary/90 transition-colors"
        >
          Get in touch <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  </>
);

export default Home;
