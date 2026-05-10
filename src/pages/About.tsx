import SectionHeader from "@/components/SectionHeader";

const founderBio = [
  "Smt. Surekha Akella is an accomplished Carnatic classical vocalist and passionate educator whose life is dedicated to music and cultural preservation. She began her musical journey at a very tender age under the guidance of her guru, Vidwan Sri Samavedam Venkata Subbarao garu, building a strong foundation in traditional Carnatic music.",
  "Her singing is admired for its melody, vocal strength, technical precision, clear diction, and perfect sruthi alignment. Over the years she has performed extensively across India, earning appreciation for her expressive and disciplined style. Her concerts at Surya Kala Mandhir have been especially well received by audiences and connoisseurs of classical music.",
  "As the Founder and Director of Raagalaya Academy, she has devoted herself fully to nurturing students in the Bay Area and across the globe. A kid-friendly teacher, her teaching emphasizes strong fundamentals, discipline, and a deep understanding of Carnatic music. She is especially known for encouraging young children, giving them opportunities to perform and grow with confidence.",
  "Through her music and teaching, Smt. Surekha Akella continues to promote Indian culture and heritage — inspiring students across generations and keeping the tradition of Carnatic music vibrant and alive.",
];

const awards = [
  "Best Vocalist · Divya Gnyana Samaj",
  "Best Vocalist · Theosophical Society of India",
  "Best Teacher · Nair's Society of California",
  "Special Mayoral Recognition · City of Santa Clara, CA",
];

const stats = [
  { value: "1,200+", label: "Students trained, ages 4–65" },
  { value: "750+", label: "Hours of performances across the U.S. and globally" },
  { value: "10,000+", label: "Combined live audience" },
  { value: "50,000+", label: "Online concert reach during and after the pandemic" },
  { value: "250+", label: "Artists supported through virtual concerts" },
  { value: "TV9 · SVBC", label: "Featured on national and international channels" },
];

const philosophy = [
  "Strong fundamentals and structured learning",
  "Clarity in sahitya (lyrics) and sruthi shuddham (pitch perfection)",
  "Encouraging students of all ages and skill levels",
  "Providing performance platforms to nurture confidence",
  "Simplifying traditional concepts to make learning accessible globally",
  "Extra preparation for university music exams and competitions",
];

const About = () => (
  <>
    <section className="py-10 md:py-14">
      <div className="container max-w-3xl text-center">
        <p className="eyebrow mb-4 flex items-center gap-3 justify-center">
          <span className="gold-divider" /> About <span className="gold-divider" />
        </p>
        <h1 className="font-serif text-2xl md:text-4xl text-primary leading-[1.15] mb-4">
          A school built around one quiet conviction.
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          That Carnatic music, taught with patience and integrity, can change
          the inner life of a person — and through them, of a culture.
        </p>
      </div>
    </section>

    {/* Institution intro */}
    <section className="pb-14 md:pb-16">
      <div className="container max-w-4xl">
        <SectionHeader eyebrow="Our story" title="About the institution" className="mb-10" />
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p className="text-foreground/85 text-lg leading-relaxed">
            Raagalaya Academy is a leading Carnatic music institution based in Santa Clara, California,
            devoted to preserving, promoting, and spreading the rich tradition of Indian classical
            music across the globe.
          </p>
          <p className="font-serif italic text-primary text-lg leading-relaxed border-l-2 border-accent pl-6">
            "I learned music without knowing it will one day become my calling."
            <span className="block not-italic font-sans text-sm text-muted-foreground mt-2">
              — Sri Mangalampalli Balamurali Krishna garu
            </span>
          </p>
          <p>
            This sentiment is the essence of our institution: to teach Carnatic vocal music and the
            way of life around it, ensuring that its fragrance is spread and its essence passed on to
            the next generation.
          </p>
          <p>
            Raagalaya has grown into a vibrant musical community that emphasizes both
            <em className="text-primary not-italic font-medium"> Abhyasa Gana</em> (learning) and
            <em className="text-primary not-italic font-medium"> Sabha Gana</em> (performance). The
            academy provides students with strong foundational training while also creating
            opportunities to perform — building confidence, discipline, and stage presence.
          </p>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-14 md:py-16 bg-secondary/40 border-y border-border">
      <div className="container">
        <SectionHeader eyebrow="Growth & reach" title="A vibrant, global musical community" className="mb-12" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border max-w-5xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="bg-background p-8 md:p-10 flex flex-col gap-3">
              <span className="font-serif italic text-3xl md:text-4xl text-accent leading-none">
                {s.value}
              </span>
              <span className="text-sm text-muted-foreground leading-relaxed">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Founder */}
    <section className="py-14 md:py-20">
      <div className="container grid md:grid-cols-5 gap-12 md:gap-16 items-start">
        <div className="md:col-span-2">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="/images/founder/surekha-akella.jpg"
              alt="Smt. Surekha Akella, Founder & Director of Raagalaya Academy"
              loading="lazy"
              width={1280}
              height={1600}
              className="h-full w-full object-cover"
            />
          </div>
          <p className="eyebrow mt-4 text-center">Smt. Surekha Akella</p>
          <p className="text-center text-sm text-muted-foreground italic">
            Founder &amp; Director · Raagalaya Academy
          </p>
        </div>
        <div className="md:col-span-3 space-y-5 text-muted-foreground leading-relaxed">
          <h2 className="font-serif text-2xl md:text-3xl text-primary leading-tight">
            The Guru
          </h2>
          {founderBio.map((para, i) => (
            <p key={i} className={i === 0 ? "text-foreground/85" : ""}>{para}</p>
          ))}

          <div className="pt-4">
            <p className="eyebrow mb-3">Recognition</p>
            <ul className="flex flex-wrap gap-2">
              {awards.map((a) => (
                <li
                  key={a}
                  className="text-xs tracking-wide border border-border bg-secondary/40 text-foreground/80 px-3 py-1.5"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Philosophy */}
    <section className="py-14 md:py-20 bg-secondary/40 border-y border-border">
      <div className="container max-w-4xl">
        <SectionHeader eyebrow="How we teach" title="Teaching philosophy" className="mb-10" />
        <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
          {philosophy.map((p) => (
            <li key={p} className="flex gap-3 text-muted-foreground leading-relaxed">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Closing quote */}
    <section className="py-14 bg-primary text-primary-foreground">
      <div className="container max-w-3xl text-center">
        <p className="font-serif text-2xl md:text-3xl italic leading-relaxed">
          "Music can make a difference."
        </p>
        <p className="eyebrow !text-primary-foreground/60 mt-6">— The Raagalaya parampara</p>
      </div>
    </section>
  </>
);

export default About;
