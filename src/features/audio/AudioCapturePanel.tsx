"use client";

import { useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
import { Button } from "@/design-system/primitives/Button";

export function AudioCapturePanel({
  label,
  tableId,
  onTranscript,
}: {
  label: string;
  tableId?: number;
  onTranscript: (text: string) => void;
}) {
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [status, setStatus] = useState("待機中");

  async function start() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("このブラウザでは録音を利用できません");
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    chunks.current = [];
    recorder.current = new MediaRecorder(stream);
    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.current.push(event.data);
    };
    recorder.current.onstop = async () => {
      stream.getTracks().forEach((track) => track.stop());
      await sendAudio();
    };
    recorder.current.start();
    setRecording(true);
    setStatus("録音中");
  }

  function stop() {
    recorder.current?.stop();
    setRecording(false);
    setStatus("文字起こし中");
  }

  async function sendAudio() {
    const file = new File(chunks.current, "lesson-audio.webm", {
      type: "audio/webm",
    });
    const form = new FormData();
    form.append("file", file);
    if (tableId) form.append("tableId", String(tableId));
    const response = await fetch("/api/transcribe", {
      method: "POST",
      body: form,
    });
    const data = (await response.json()) as { text?: string; error?: string };
    if (data.text) {
      onTranscript(data.text);
      setStatus("文字起こし完了");
    } else {
      setStatus(data.error ?? "文字起こしに失敗しました");
    }
  }

  return (
    <div className="km-panel">
      <div className="km-panel__header">
        <span>{label}</span>
        <span className="km-meta">
          <span aria-hidden className="status-dot" /> {status}
        </span>
      </div>
      <div className="km-panel__body km-stack">
        <p>
          マイク権限を許可して短く録音すると、OpenAI API 設定時は文字起こし、
          未設定時はモックコメントを返します。
        </p>
        <Button
          icon={recording ? Square : Mic}
          onClick={recording ? stop : start}
          variant={recording ? "black" : "white"}
        >
          {recording ? "録音停止" : "録音開始"}
        </Button>
      </div>
    </div>
  );
}
