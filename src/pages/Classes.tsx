import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const tracks = [
  {
    title: "Carnatic Vocal — our heart",
    text: "Vocal music is the soul of the Carnatic tradition and the primary discipline at Raagalaya Academy. Voice culture, swara sadhana, and a graded path through varnams, kritis, and manodharma sangeetham.",
  },
  {
    title: "Voice Culture",
    text: "Breath, sruti alignment, open-throated production, and the patient cultivation of a clear, expressive vocal tone — the foundation of every kacheri.",
  },
  {
    title: "Manodharma Sangeetham",
    text: "Improvisation as a way of being. Alapana, niraval, and kalpana swaras taught organically once a strong vocal foundation is in place.",
  },
  {
    title: "Performing with accompaniment",
    text: "For senior vocal students, supplementary practice with classical instrumentalists — to deepen your understanding of the kacheri form.",
    instruments: ["Violin", "Veena", "Flute", "Mridangam", "Kanjira"],
  },
];

const levels = [
  {
    name: "Beginner",
    duration: "Year 1 – 4",
    items: [
      "Sarali, jantai, hechusthayi and dhattu swaras",
      "Alankaras across the seven talas",
      "Geethams, swarapallavi and swarajatis",
      "Voice culture and breath training",
    ],
  },
  {
    name: "Intermediate",
    duration: "Year 5 – 8",
    items: [
      "Varnams in major ragas",
      "Introduction to kritis (Tyagaraja, Annamacharya, Ramadasu, Dikshitar, Syama Sastri, and others)",
      "Foundational raga alapana",
      "Tala awareness and basic kalpana swaras",
    ],
  },
  {
    name: "Advanced",
    duration: "Year 8+",
    items: [
      "Major ragas with detailed alapana, niraval, kalpana swaras",
      "Pallavi singing and complex talas (RTP)",
      "Concert structure and stage presence",
      "Preparation for arangetram",
    ],
  },
];

const Classes = () => (
  <>
    <section className="py-10 md:py-14">
      <div className="container">
        <SectionHeader
          eyebrow="Vocal Carnatic Classes"
          title="A patient, structured path to finding your voice."
          description="Raagalaya Academy is, first and foremost, a vocal school. The curriculum below is a guide — not a race. Your guru will set the pace based on your voice, your time, and your sincerity."
        />
      </div>
    </section>

    {/* Tracks */}
    <section className="pb-14">
      <div className="container">
        <h2 className="font-serif text-2xl md:text-3xl text-primary mb-10 text-center">
          What you'll learn
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map((t) => (
            <div
              key={t.title}
              className="border border-border p-8 bg-card hover:border-accent transition-colors"
            >
              <h3 className="font-serif text-xl text-primary mb-3">{t.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.text}</p>
              {t.instruments && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {t.instruments.map((inst) => (
                    <li
                      key={inst}
                      className="font-serif italic text-sm text-primary border border-border px-2.5 py-1 bg-secondary/40"
                    >
                      {inst}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Levels */}
    <section className="py-14 md:py-16 bg-secondary/40 border-y border-border">
      <div className="container">
        <SectionHeader
          eyebrow="The journey"
          title="Three levels. Many years. One voice — yours."
          className="mb-16"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {levels.map((lvl) => (
            <div key={lvl.name} className="bg-background p-10 border border-border">
              <p className="eyebrow text-accent mb-2">{lvl.duration}</p>
              <h3 className="font-serif text-2xl text-primary mb-6">{lvl.name}</h3>
              <ul className="space-y-3">
                {lvl.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Format */}
    <section className="py-14 md:py-20">
      <div className="container max-w-4xl">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-serif text-2xl text-primary mb-3">In-person</h3>
            <p className="text-muted-foreground leading-relaxed">
              Classes are held at our Santa Clara studio in small groups and
              one-on-one settings, mornings and evenings on weekdays and weekends.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl text-primary mb-3">Online</h3>
            <p className="text-muted-foreground leading-relaxed">
              Live video classes for students worldwide, scheduled across
              time zones. Same curriculum, same care.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center border-t border-border pt-16">
          <h3 className="font-serif text-2xl md:text-3xl text-primary mb-4">
            Ready to begin?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Reach out for an introductory conversation — we'll discuss your
            background, goals, and the right starting point for you.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 text-sm tracking-wide hover:bg-primary/90 transition-colors"
          >
            Enquire about classes <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default Classes;
