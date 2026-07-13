import type { Sentiment } from "@/types/domain";

const confusedKeywords = [
  "分からない",
  "わからない",
  "分かりません",
  "わかりません",
  "難しい",
  "むずかしい",
  "むずい",
  "もう一度",
  "もう1回",
  "もういっかい",
  "ついていけない",
  "迷う",
  "迷って",
  "不安",
  "??",
  "??",
];

const excitedKeywords = [
  "面白い",
  "おもしろい",
  "すごい",
  "すげー",
  "楽しい",
  "たのしい",
  "もっと",
  "最高",
  "!!",
  "!!",
];

const positiveKeywords = [
  "なるほど",
  "わかった",
  "分かった",
  "わかりました",
  "分かりました",
  "理解",
  "いいね",
  "納得",
  "できた",
  "できました",
  "ありがとう",
];

export function classifySentiment(text: string): Sentiment {
  if (confusedKeywords.some((keyword) => text.includes(keyword))) {
    return "confused";
  }
  if (excitedKeywords.some((keyword) => text.includes(keyword))) {
    return "excited";
  }
  if (positiveKeywords.some((keyword) => text.includes(keyword))) {
    return "positive";
  }
  return "neutral";
}
