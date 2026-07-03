(function sunsunAiDanmakuOverlay() {
  const rootId = "sunsunai-danmaku-root";
  const sourceName = "sunsunai";
  let index = 0;

  function ensureRoot() {
    let root = document.getElementById(rootId);
    if (!root) {
      root = document.createElement("div");
      root.id = rootId;
      root.setAttribute("aria-hidden", "true");
      document.documentElement.appendChild(root);
    }
    return root;
  }

  function addComment(payload) {
    const root = ensureRoot();
    const comment = document.createElement("span");
    const lane = payload.lane || (index % 2 === 0 ? "top" : "bottom");
    const tableId = String(payload.tableId || 0).padStart(2, "0");
    comment.className = "sunsunai-danmaku-comment";
    comment.dataset.lane = lane;
    comment.textContent = `[T${tableId}] ${payload.text || ""}`;
    comment.style.setProperty("--sunsunai-offset", `${20 + (index % 6) * 44}px`);
    comment.style.setProperty("--sunsunai-speed", `${payload.speed || 12}s`);
    root.appendChild(comment);
    index += 1;
    window.setTimeout(() => comment.remove(), (payload.speed || 12) * 1000 + 1000);
  }

  window.addEventListener("message", (event) => {
    if (event.source !== window) return;
    const data = event.data || {};
    if (data.source !== sourceName || data.type !== "SUNSUN_DANMAKU") return;
    addComment(data.payload || {});
  });

  if (typeof chrome !== "undefined" && chrome.runtime?.onMessage) {
    chrome.runtime.onMessage.addListener((message) => {
      if (message?.type === "SUNSUN_DANMAKU") {
        addComment(message.payload || {});
      }
    });
  }
})();
