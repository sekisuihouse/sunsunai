"use client";

import { useState } from "react";
import { Eye, EyeOff, Pause, Play } from "lucide-react";
import { Button } from "@/design-system/primitives/Button";
import type { DanmakuSettings, TimelineEntry } from "@/types/domain";
import { DanmakuOverlay } from "./DanmakuOverlay";

const defaultSettings: DanmakuSettings = {
  lanes: "both",
  opacity: 0.92,
  speed: 13,
  fontScale: 1,
  paused: false,
  hidden: false,
};

export function LiveStage({ timeline }: { timeline: TimelineEntry[] }) {
  const [settings, setSettings] = useState<DanmakuSettings>(defaultSettings);

  return (
    <div className="km-stack">
      <div className="live-stage">
        <div className="live-stage__document">
          <div className="live-stage__document-inner">
            <p className="km-eyebrow">SLIDE 03 / DESIGN THINKING</p>
            <h2 className="live-stage__document-title">失敗を早く見つける</h2>
            <p className="km-subheading">
              低コストな試作で学びを増やし、次の改善につなげる。
            </p>
          </div>
        </div>
        <DanmakuOverlay settings={settings} timeline={timeline} />
      </div>

      <div className="km-panel">
        <div className="km-panel__header">
          <span>弾幕コントロール</span>
          <span className="km-meta">上部・下部・透明度・速度を調整</span>
        </div>
        <div className="km-panel__body km-grid km-grid--two">
          <label className="km-field">
            <span>表示レーン</span>
            <select
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  lanes: event.target.value as DanmakuSettings["lanes"],
                }))
              }
              value={settings.lanes}
            >
              <option value="both">上部と下部</option>
              <option value="top">上部のみ</option>
              <option value="bottom">下部のみ</option>
            </select>
          </label>
          <label className="km-field">
            <span>透明度 {Math.round(settings.opacity * 100)}%</span>
            <input
              max="1"
              min="0.4"
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  opacity: Number(event.target.value),
                }))
              }
              step="0.04"
              type="range"
              value={settings.opacity}
            />
          </label>
          <label className="km-field">
            <span>速度 {settings.speed}秒</span>
            <input
              max="22"
              min="7"
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  speed: Number(event.target.value),
                }))
              }
              type="range"
              value={settings.speed}
            />
          </label>
          <label className="km-field">
            <span>文字サイズ {settings.fontScale.toFixed(1)}倍</span>
            <input
              max="1.4"
              min="0.8"
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  fontScale: Number(event.target.value),
                }))
              }
              step="0.1"
              type="range"
              value={settings.fontScale}
            />
          </label>
          <Button
            icon={settings.paused ? Play : Pause}
            onClick={() =>
              setSettings((current) => ({ ...current, paused: !current.paused }))
            }
            size="small"
            variant="black"
          >
            {settings.paused ? "再開" : "一時停止"}
          </Button>
          <Button
            icon={settings.hidden ? Eye : EyeOff}
            onClick={() =>
              setSettings((current) => ({ ...current, hidden: !current.hidden }))
            }
            size="small"
          >
            {settings.hidden ? "表示" : "非表示"}
          </Button>
        </div>
      </div>
    </div>
  );
}
