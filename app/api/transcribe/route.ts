import { NextResponse } from "next/server";

const mockPhrases = [
  "ここ難しい、例がもう一つほしい",
  "なるほど、今の説明で分かった",
  "評価基準を先に見たい",
  "このワーク面白い、他の案も見たい",
];

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_TRANSCRIBE_MODEL || "gpt-4o-mini-transcribe";
  const formData = await request.formData();
  const file = formData.get("file");

  if (!apiKey || !(file instanceof File)) {
    return NextResponse.json({
      text: mockPhrases[Math.floor(Math.random() * mockPhrases.length)],
      mocked: true,
    });
  }

  const upstreamForm = new FormData();
  upstreamForm.append("file", file);
  upstreamForm.append("model", model);
  upstreamForm.append("language", "ja");
  upstreamForm.append("response_format", "json");

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: upstreamForm,
  });

  if (!response.ok) {
    const detail = await response.text();
    return NextResponse.json(
      {
        error: `Transcription API failed: ${response.status}`,
        detail,
        text: mockPhrases[0],
        mocked: true,
      },
      { status: 200 },
    );
  }

  const data = (await response.json()) as { text?: string };
  return NextResponse.json({ text: data.text ?? "", mocked: false });
}
