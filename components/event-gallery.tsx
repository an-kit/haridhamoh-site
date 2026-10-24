import type { Event } from "@/lib/content/schema";

import { formatMediaBadge } from "@/lib/events/format";

type MediaItem = NonNullable<Event["media"]>[number];
type PhotoItem = Extract<MediaItem, { type: "photo" }>;

const galleryScript = `(() => {
  document.querySelectorAll("[data-gallery]").forEach((root) => {
    const dialog = root.querySelector("[data-gallery-dialog]");
    const track = root.querySelector("[data-gallery-track]");
    const counter = root.querySelector("[data-gallery-counter]");
    if (!dialog || !track || !counter) return;
    const slides = Array.from(track.querySelectorAll("[data-gallery-slide]"));
    const closeButton = dialog.querySelector("[data-gallery-close]");
    let lastTrigger = null;
    let current = 0;
    const update = () => {
      if (!slides.length) return;
      const width = track.clientWidth || 1;
      current = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / width)));
      counter.textContent = (current + 1) + " of " + slides.length;
    };
    root.querySelectorAll("[data-gallery-open]").forEach((button) => {
      button.addEventListener("click", () => {
        lastTrigger = button;
        const index = Number(button.dataset.galleryOpen || 0);
        dialog.showModal();
        requestAnimationFrame(() => {
          track.scrollTo({ left: track.clientWidth * index, behavior: "instant" });
          update();
          if (closeButton) closeButton.focus();
        });
      });
    });
    track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
      }
    });
    dialog.addEventListener("close", () => {
      if (lastTrigger) lastTrigger.focus();
    });
  });
  document.querySelectorAll("[data-youtube-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + button.dataset.youtubeId + "?autoplay=1&rel=0";
      iframe.title = button.dataset.youtubeTitle || "Event video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.className = "aspect-video w-full rounded-xl bg-black";
      button.replaceWith(iframe);
    });
  });
})();`;

function isPhoto(item: MediaItem): item is PhotoItem {
  return item.type === "photo";
}

export function EventGallery({ media, title }: { media: MediaItem[]; title: string }) {
  if (media.length === 0) return null;
  const photos = media.filter(isPhoto);
  const badge = formatMediaBadge({ media });

  return (
    <div className="mt-8" data-gallery>
      <h2 className="font-display text-3xl text-slate">Photos and video</h2>
      {badge ? <p className="mt-1 text-sm font-medium text-slate/70">{badge}</p> : null}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {media.map((item, index) =>
          item.type === "photo" ? (
            <button
              className="group relative overflow-hidden rounded-xl bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron"
              data-gallery-open={photos.indexOf(item)}
              key={`photo-${item.src}`}
              type="button"
            >
              <img
                alt={item.alt}
                className="aspect-square w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                height={400}
                loading="lazy"
                src={item.thumb}
                width={400}
              />
            </button>
          ) : (
            <button
              className="group relative overflow-hidden rounded-xl bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron"
              data-youtube-id={item.videoId}
              data-youtube-title={item.title}
              key={`youtube-${item.videoId}-${index}`}
              type="button"
            >
              <img
                alt={`Play ${item.title}`}
                className="aspect-video w-full object-cover"
                height={360}
                loading="lazy"
                src={`https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`}
                width={640}
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-black/70 text-white">
                  <span aria-hidden="true" className="ml-1 text-2xl">▶</span>
                </span>
              </span>
            </button>
          ),
        )}
      </div>

      {photos.length > 0 ? (
        <dialog
          aria-label={`${title} photos`}
          className="fixed inset-0 m-0 h-full w-full max-w-none bg-black/95 p-0 text-white backdrop:bg-black/80"
          data-gallery-dialog
        >
        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between p-4">
            <p className="text-sm font-semibold" data-gallery-counter>
              1 of {photos.length}
            </p>
            <button
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              data-gallery-close
              type="button"
            >
              Close
            </button>
          </div>
          <div
            className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
            data-gallery-track
          >
            {photos.map((photo) => (
              <figure
                className="flex min-w-full snap-center flex-col items-center justify-center gap-4 p-4"
                data-gallery-slide
                key={`slide-${photo.src}`}
              >
                <img
                  alt={photo.alt}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                  height={1200}
                  src={photo.src}
                  width={1600}
                />
                {photo.caption ? (
                  <figcaption className="max-w-3xl text-center text-sm text-white/80">
                    {photo.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </div>
        </dialog>
      ) : null}

      <script dangerouslySetInnerHTML={{ __html: galleryScript }} />
    </div>
  );
}
