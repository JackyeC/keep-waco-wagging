import { announcementBar } from "@/lib/site";

export function AnnouncementBar() {
  if (!announcementBar.enabled || !announcementBar.message.trim()) {
    return null;
  }

  return (
    <div className="border-b border-border/80 bg-soft-cream px-4 py-2 text-center">
      <p className="text-[11px] font-medium tracking-[0.18em] text-label-muted uppercase">
        {announcementBar.message}
        {announcementBar.showHeart && (
          <>
            {" "}
            <span className="text-rose" aria-hidden="true">
              ♥
            </span>
          </>
        )}
      </p>
    </div>
  );
}
