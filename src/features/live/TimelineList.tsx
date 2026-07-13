import { formatElapsed } from "@/lib/report";
import type { TimelineEntry } from "@/types/domain";

export function TimelineList({ timeline }: { timeline: TimelineEntry[] }) {
  return (
    <div className="timeline">
      {timeline
        .slice()
        .sort((a, b) => a.elapsedSeconds - b.elapsedSeconds)
        .map((entry) => (
          <article className="timeline__item" key={entry.id}>
            <time className="km-meta">{formatElapsed(entry.elapsedSeconds)}</time>
            <div>
              <div className="timeline__speaker">
                {entry.role === "teacher"
                  ? `Teacher${entry.speakerName ? ` / ${entry.speakerName}` : ""}`
                  : `Table ${String(entry.tableId ?? 0).padStart(2, "0")}${
                      entry.speakerName ? ` / ${entry.speakerName}` : ""
                    }`}
              </div>
              <div>{entry.text}</div>
              <div className="km-meta">{entry.sentiment} / {entry.source}</div>
            </div>
          </article>
        ))}
    </div>
  );
}
