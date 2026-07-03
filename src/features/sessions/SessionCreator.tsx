"use client";

import { useRouter } from "next/navigation";
import { CalendarPlus } from "lucide-react";
import { Button } from "@/design-system/primitives/Button";
import { createId } from "@/lib/storage";
import type { LessonSession } from "@/types/domain";
import { useLessonStore } from "./useLessonStore";

export function SessionCreator() {
  const router = useRouter();
  const { setSession } = useLessonStore();

  function createSession(formData: FormData) {
    const title = String(formData.get("title") || "新しい授業");
    const classroom = String(formData.get("classroom") || "未設定");
    const teacherName = String(formData.get("teacherName") || "教員");
    const tableCount = Number(formData.get("tableCount") || 12);
    const session: LessonSession = {
      id: createId("lesson"),
      title,
      classroom,
      teacherName,
      tableCount,
      startsAt: new Date().toISOString(),
      status: "live",
      joinCode: Math.random().toString(36).slice(2, 8).toUpperCase(),
    };
    setSession(session);
    router.push("/live");
  }

  return (
    <form action={createSession} className="km-form">
      <label className="km-field">
        <span>授業名</span>
        <input name="title" required placeholder="デザイン思考入門" />
      </label>
      <div className="km-grid km-grid--two">
        <label className="km-field">
          <span>教室</span>
          <input name="classroom" required placeholder="A-301" />
        </label>
        <label className="km-field">
          <span>教員名</span>
          <input name="teacherName" required placeholder="山田先生" />
        </label>
      </div>
      <label className="km-field">
        <span>テーブル数</span>
        <select defaultValue="12" name="tableCount">
          {Array.from({ length: 12 }, (_, index) => index + 1).map((count) => (
            <option key={count} value={count}>
              {count}テーブル
            </option>
          ))}
        </select>
      </label>
      <Button icon={CalendarPlus} type="submit" variant="black">
        授業を開始
      </Button>
    </form>
  );
}
