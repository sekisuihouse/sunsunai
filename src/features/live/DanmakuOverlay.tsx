import type { CSSProperties } from "react";
import type { DanmakuSettings, TimelineEntry } from "@/types/domain";

export function DanmakuOverlay({
  timeline,
  settings,
}: {
  timeline: TimelineEntry[];
  settings: DanmakuSettings;
}) {
  const visible = timeline
    .filter((entry) => entry.role === "student")
    .slice(-14)
    .map((entry, index) => {
      const lane =
        settings.lanes === "both"
          ? index % 2 === 0
            ? "top"
            : "bottom"
          : settings.lanes;
      return { entry, lane, index };
    });

  return (
    <div
      className="danmaku-layer"
      data-hidden={settings.hidden}
      style={
        {
          "--danmaku-opacity": settings.opacity,
          "--danmaku-speed": `${settings.speed}s`,
          "--danmaku-font-scale": settings.fontScale,
          "--danmaku-state": settings.paused ? "paused" : "running",
        } as CSSProperties
      }
    >
      {visible.map(({ entry, lane, index }) => (
        <span
          className="danmaku-comment"
          data-lane={lane}
          key={entry.id}
          style={
            {
              "--comment-offset": `calc(var(--km-space-5) + ${index % 7} * var(--km-space-10))`,
              animationDelay: `${(index % 5) * -2}s`,
            } as CSSProperties
          }
        >
          [T{String(entry.tableId ?? 0).padStart(2, "0")}
          {entry.speakerName ? ` ${entry.speakerName}` : ""}] {entry.text}
        </span>
      ))}
    </div>
  );
}
