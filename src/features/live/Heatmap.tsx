import type { CSSProperties } from "react";
import { buildHeatmap } from "@/lib/heatmap";
import { formatElapsed } from "@/lib/report";
import type { TimelineEntry } from "@/types/domain";

export function Heatmap({ timeline }: { timeline: TimelineEntry[] }) {
  const buckets = buildHeatmap(timeline);
  const max = Math.max(...buckets.map((bucket) => bucket.count), 1);

  return (
    <div className="heatmap" aria-label="コメントヒートマップ">
      {buckets.map((bucket) => (
        <div className="heatmap__bar" key={bucket.startSeconds}>
          <button
            aria-label={`${formatElapsed(bucket.startSeconds)}から${formatElapsed(
              bucket.endSeconds,
            )}のコメント数 ${bucket.count}`}
            style={
              {
                "--bar-height": `calc(${Math.max(bucket.count / max, 0.08)} * 120px)`,
              } as CSSProperties
            }
            type="button"
          >
            {bucket.count}
          </button>
          <span className="km-meta">{formatElapsed(bucket.startSeconds)}</span>
        </div>
      ))}
    </div>
  );
}
