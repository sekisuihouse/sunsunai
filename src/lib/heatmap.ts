import type { HeatmapBucket, TimelineEntry } from "@/types/domain";

export function buildHeatmap(
  timeline: TimelineEntry[],
  bucketSeconds = 300,
): HeatmapBucket[] {
  if (timeline.length === 0) return [];
  const maxSeconds = Math.max(...timeline.map((entry) => entry.elapsedSeconds), bucketSeconds);
  const bucketCount = Math.ceil(maxSeconds / bucketSeconds);
  return Array.from({ length: bucketCount }, (_, index) => {
    const startSeconds = index * bucketSeconds;
    const endSeconds = startSeconds + bucketSeconds;
    return {
      startSeconds,
      endSeconds,
      count: timeline.filter(
        (entry) =>
          entry.elapsedSeconds >= startSeconds && entry.elapsedSeconds < endSeconds,
      ).length,
    };
  });
}
