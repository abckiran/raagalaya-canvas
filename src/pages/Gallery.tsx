import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import galleryData from "../../content/gallery.json";

type Video = { title: string; youtube_id: string; order?: number };

const pressFiles = import.meta.glob<Video>("../../content/videos/press/*.json", { eager: true, import: "default" });
const mayoralFiles = import.meta.glob<Video>("../../content/videos/mayoral/*.json", { eager: true, import: "default" });
const performanceFiles = import.meta.glob<Video>("../../content/videos/performances/*.json", { eager: true, import: "default" });

const byOrder = (a: Video, b: Video) => (a.order ?? 999) - (b.order ?? 999);
const press = Object.values(pressFiles).sort(byOrder);
const mayoralAwards = Object.values(mayoralFiles).sort(byOrder);
const videos = Object.values(performanceFiles).sort(byOrder);

const photos = galleryData.photos.map((p) => ({
  full: p.image,
  thumb: p.image.replace(/\.(jpg|jpeg|png|webp)$/i, "-thumb.$1"),
  alt: p.alt,
}));

const Lightbox = ({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center p-4 md:p-10 bg-primary/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <img
        src={photos[index].full}
        alt={photos[index].alt}
        className="max-h-full max-w-full object-contain shadow-2xl select-none pointer-events-auto"
        draggable={false}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.preventDefault()}
      />
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        className="absolute top-4 right-4 grid place-items-center h-11 w-11 rounded-full bg-primary-foreground/15 hover:bg-accent text-primary-foreground border border-primary-foreground/25 transition-colors"
      >
        <X size={18} />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 grid place-items-center h-11 w-11 rounded-full bg-primary-foreground/15 hover:bg-accent text-primary-foreground border border-primary-foreground/25 transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 grid place-items-center h-11 w-11 rounded-full bg-primary-foreground/15 hover:bg-accent text-primary-foreground border border-primary-foreground/25 transition-colors"
      >
        <ChevronRight size={18} />
      </button>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-[0.25em] text-primary-foreground/70 bg-primary/60 px-3 py-1.5 border border-primary-foreground/20">
        {index + 1} / {photos.length}
      </div>
    </div>
  );
};

const VideoCard = ({ youtube_id, title }: Video) => (
  <div className="bg-background border border-border">
    <div className="aspect-video">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${youtube_id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
    <div className="p-5">
      <p className="font-serif text-primary text-sm leading-snug">{title}</p>
    </div>
  </div>
);

const Gallery = () => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const close = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx((i) => (i === null ? 0 : (i - 1 + photos.length) % photos.length));
  const next = () => setLightboxIdx((i) => (i === null ? 0 : (i + 1) % photos.length));

  return (
    <>
      <section className="py-10 md:py-14">
        <div className="container">
          <SectionHeader
            eyebrow="Gallery"
            title="A visual diary of our musical journey."
            description="Concerts, recitals, classes, and milestones — moments from life at the academy."
          />
        </div>
      </section>

      {/* Photo grid */}
      <section className="pb-14">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5 md:gap-2">
            {photos.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxIdx(i)}
                className="aspect-[4/3] overflow-hidden bg-secondary group focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                aria-label={`Open photograph ${i + 1} of ${photos.length}`}
              >
                <img
                  src={p.thumb}
                  alt={p.alt}
                  loading="lazy"
                  width={640}
                  height={480}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-full w-full object-cover select-none group-hover:scale-[1.04] transition-transform duration-700"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="py-12 md:py-16 bg-secondary/40 border-y border-border">
        <div className="container">
          <SectionHeader eyebrow="In the Press" title="TV9 USA coverage" className="mb-10" />
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {press.map((v) => (
              <VideoCard key={v.youtube_id} {...v} />
            ))}
          </div>
        </div>
      </section>

      {/* Mayoral awards */}
      <section className="py-12 md:py-16">
        <div className="container">
          <SectionHeader
            eyebrow="Recognition"
            title="Mayoral Awards 2026 & 2025"
            description="Recognized by the City of Santa Clara, California for contributions to music and the community."
            className="mb-10"
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {mayoralAwards.map((v) => (
              <VideoCard key={v.youtube_id} {...v} />
            ))}
          </div>
        </div>
      </section>

      {/* Performances */}
      <section className="py-12 md:py-16 bg-secondary/40 border-y border-border">
        <div className="container">
          <SectionHeader eyebrow="Performances" title="Listen and watch" className="mb-10" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {videos.map((v) => (
              <VideoCard key={v.youtube_id} {...v} />
            ))}
          </div>
        </div>
      </section>

      {lightboxIdx !== null && (
        <Lightbox index={lightboxIdx} onClose={close} onPrev={prev} onNext={next} />
      )}
    </>
  );
};

export default Gallery;
