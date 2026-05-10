import SectionHeader from "@/components/SectionHeader";
import { Calendar, MapPin } from "lucide-react";
import eventImg from "@/assets/events-concert.jpg";

type EventData = {
  title: string;
  date: string;
  venue: string;
  description: string;
  order?: number;
};

const upcomingFiles = import.meta.glob<EventData>("../../content/events/upcoming/*.json", { eager: true, import: "default" });
const pastFiles = import.meta.glob<EventData>("../../content/events/past/*.json", { eager: true, import: "default" });

const SENTINEL_FUTURE = "9999-99-99";
const upcoming = Object.values(upcomingFiles).sort((a, b) => (a.date || SENTINEL_FUTURE).localeCompare(b.date || SENTINEL_FUTURE));
const past = Object.values(pastFiles).sort((a, b) => (b.date || "").localeCompare(a.date || ""));

const formatDate = (iso: string): string => {
  if (!iso) return "TBD";
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
};

const Events = () => (
  <>
    <section className="relative h-[40vh] min-h-[280px] overflow-hidden">
      <img src={eventImg} alt="Carnatic concert stage" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1100} />
      <div className="absolute inset-0 bg-primary/70" />
      <div className="relative h-full container flex items-end pb-10 text-primary-foreground">
        <div className="max-w-2xl">
          <p className="eyebrow !text-primary-foreground/70 mb-3">Events</p>
          <h1 className="font-serif text-2xl md:text-4xl leading-[1.15]">
            Concerts, recitals, and gatherings.
          </h1>
        </div>
      </div>
    </section>

    {/* Upcoming */}
    <section className="py-14 md:py-20">
      <div className="container">
        <SectionHeader eyebrow="Upcoming" title="What's next" className="mb-10" />
        <div className="max-w-3xl mx-auto divide-y divide-border border-y border-border">
          {upcoming.map((e) => (
            <article key={`upcoming-${e.title}`} className="py-8 grid md:grid-cols-[160px_1fr] gap-4 md:gap-10">
              <div className="text-accent font-serif text-lg flex md:block items-center gap-2">
                <Calendar size={16} className="md:hidden" />
                {formatDate(e.date)}
              </div>
              <div>
                <h3 className="font-serif text-xl md:text-2xl text-primary mb-2">{e.title}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3">
                  <MapPin size={14} /> {e.venue}
                </p>
                <p className="text-muted-foreground leading-relaxed">{e.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* Past */}
    <section className="py-12 md:py-16 bg-secondary/40 border-y border-border">
      <div className="container max-w-4xl">
        <SectionHeader eyebrow="Archive" title="Recent performances" className="mb-12" />
        <ul className="divide-y divide-border border-y border-border">
          {past.map((p) => (
            <li
              key={`past-${p.title}-${p.date}`}
              className="py-6 grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-1 sm:gap-6 items-start"
            >
              <span className="eyebrow text-accent">{formatDate(p.date)}</span>
              <div>
                <p className="font-serif text-primary text-base md:text-lg leading-snug">{p.title}</p>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                  <MapPin size={13} /> {p.venue}
                </p>
                {p.description && <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </>
);

export default Events;
