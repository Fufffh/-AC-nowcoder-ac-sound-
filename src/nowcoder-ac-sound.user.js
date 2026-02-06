// ==UserScript==
// @name         牛客AC音效
// @namespace    nowcoder-ac-sound
// @version      1.1
// @match        https://ac.nowcoder.com/*
// @run-at       document-start
// @author       Fufffh
// @grant        none
// @icon         https://youke.xn--y7xa690gmna.cn/s1/2026/02/06/698566dd55eea.webp
// ==/UserScript==

 /*
   ===================== 音效格式说明 =====================

   你需要把音频文件转换成 base64，填到 MY_SOUND_B64 里。

   常见音频格式对应的 MIME：

   1) MP3 文件
      MIME: audio/mpeg

   2) WAV 文件
      MIME: audio/wav

   3) OGG 文件（常见为 opus/vorbis）
      MIME: audio/ogg

   4) AAC / M4A 文件（部分浏览器支持）
      MIME: audio/aac   或 audio/mp4

   注意事项：
   - MY_SOUND_B64 里只放纯 base64，不要带 "data:audio/xxx;base64," 前缀
   - base64 必须完整，否则会出现只播放 1 秒或无法播放的问题
   - 建议用 ogg 或 mp3，兼容性最好

   =========================================================
  */


(() => {
  "use strict";

  // ========= 配置区===================
  const MODE = "replace"; // "replace" | "mute" | "off"

  // 这里存放要替换音频的BASE64
  const MY_SOUND_B64 = '' 

  const COOLDOWN_MS = 800; // 防止重复触发把音效打断
  // ===================================

  const TARGET_RE = /\/acts\/acm_pass\.wav(\?|$)/i;

  const myAudio =
    MODE === "replace" && MY_SOUND_B64
      ? new Audio(`data:audio/ogg;base64,${MY_SOUND_B64}`)
      : null;

  if (myAudio) myAudio.volume = 1.0;

  let lastTrigger = 0;

  const oldPlay = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function (...args) {
    const src = this.currentSrc || this.src || "";

    if (this.tagName === "AUDIO" && TARGET_RE.test(src)) {
      // off：完全不管（播放原音效）
      if (MODE === "off") return oldPlay.apply(this, args);

      // mute / replace：先拦截原音效
      const now = Date.now();
      if (now - lastTrigger < COOLDOWN_MS) return Promise.resolve();
      lastTrigger = now;

      try { this.pause(); } catch {}
      try { this.currentTime = 0; } catch {}
      try { this.muted = true; } catch {}

      // mute：只静音
      if (MODE === "mute") return Promise.resolve();

      // replace：播放自定义音效（要求 MY_SOUND_B64 非空）
      if (MODE === "replace" && myAudio) {
        try { myAudio.currentTime = 0; } catch {}
        myAudio.play().catch(() => {});
        return Promise.resolve();
      }

      // replace 但没填 base64：退化为静音
      return Promise.resolve();
    }

    return oldPlay.apply(this, args);
  };
})();
