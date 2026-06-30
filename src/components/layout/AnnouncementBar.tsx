import { announcementBar } from "@/lib/site";

export function AnnouncementBar() {
  if (!announcementBar.enabled || !announcementBar.message.trim()) {
    return null;
  }

  return (
    <div className="bg-wag-sage px-4 py-2.5 text-center text-cream">
      <p className="text-[12.5px] font-normal tracking-[0.16em] uppercase">
        {announcementBar.message}
        {announcementBar.showHeart && (
          <>
            {" "}
            <span className="text-blush-warm" aria-hidden="true">
              ♥
            </span>
          </>
        )}
      </p>
    </div>
  );
}
