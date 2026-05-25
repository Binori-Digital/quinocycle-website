import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  staticFile,
} from "remotion";

// ─── Brand / palette ──────────────────────────────────────────────────────────
const C = {
  cream:   "#fdf9f0",
  gold:    "#ffc600",
  dark:    "#1d1c16",
  green:   "#546159",
  brown:   "#765a00",
  muted:   "#81765f",
  white:   "#ffffff",
  tiktok:  "#010101",
} as const;

const FF_HEAD = "'Epilogue', sans-serif";
const FF_BODY = "'Work Sans', sans-serif";

// ─── Fonts (embedded via style tag) ──────────────────────────────────────────
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@400;700;800;900&family=Work+Sans:wght@300;400;500;600;700&display=swap');`;

// ─── Timing (30 fps) ─────────────────────────────────────────────────────────
const FPS   = 30;
const INTRO  = 2.5 * FPS;  // 75
const BOX1   = 8   * FPS;  // 240
const BOX2   = 8   * FPS;  // 240
const BOX3   = 8   * FPS;  // 240
const OUTRO  = 3.5 * FPS;  // 105

const T_INTRO = 0;
const T_BOX1  = T_INTRO + INTRO;
const T_BOX2  = T_BOX1  + BOX1;
const T_BOX3  = T_BOX2  + BOX2;
const T_OUTRO = T_BOX3  + BOX3;

export const UGC_TOTAL = T_OUTRO + OUTRO; // 900 = 30s

// ─── Spring helper ────────────────────────────────────────────────────────────
function spr(frame: number, delay = 0, damping = 14, stiffness = 80) {
  return spring({ frame: frame - delay, fps: FPS, config: { damping, stiffness } });
}

// ─── Grain overlay ────────────────────────────────────────────────────────────
function Grain() {
  const frame = useCurrentFrame();
  // Pseudo-random per-frame grain via SVG turbulence seed
  const seed = (frame * 7 + 13) % 99;
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.045, mixBlendMode: "overlay", pointerEvents: "none" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" seed={seed} />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

// ─── Phone vignette ───────────────────────────────────────────────────────────
function Vignette() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
      pointerEvents: "none",
    }} />
  );
}

// ─── TikTok UI chrome ────────────────────────────────────────────────────────
function TikTokChrome({ handle, song }: { handle: string; song: string }) {
  const frame = useCurrentFrame();
  const discRot = (frame * 2) % 360;
  return (
    <>
      {/* Top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "52px 24px 16px", display: "flex", justifyContent: "center", pointerEvents: "none" }}>
        <span style={{ fontFamily: FF_BODY, fontWeight: 600, fontSize: 17, color: C.white, letterSpacing: "0.04em" }}>Following</span>
        <span style={{ fontFamily: FF_BODY, fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.55)", marginLeft: 24, letterSpacing: "0.04em" }}>For You</span>
      </div>

      {/* Right-side action buttons */}
      <div style={{ position: "absolute", right: 16, bottom: 220, display: "flex", flexDirection: "column", alignItems: "center", gap: 22, pointerEvents: "none" }}>
        {/* Heart */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 26 }}>❤️</span>
          </div>
          <span style={{ fontFamily: FF_BODY, fontSize: 12, color: C.white, fontWeight: 600 }}>24.6K</span>
        </div>
        {/* Comment */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 24 }}>💬</span>
          </div>
          <span style={{ fontFamily: FF_BODY, fontSize: 12, color: C.white, fontWeight: 600 }}>318</span>
        </div>
        {/* Bookmark */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 22 }}>🔖</span>
          </div>
          <span style={{ fontFamily: FF_BODY, fontSize: 12, color: C.white, fontWeight: 600 }}>1,204</span>
        </div>
        {/* Share */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 22 }}>↗️</span>
          </div>
          <span style={{ fontFamily: FF_BODY, fontSize: 12, color: C.white, fontWeight: 600 }}>Share</span>
        </div>
        {/* Spinning disc */}
        <div style={{ width: 46, height: 46, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.8)", background: "#222", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", transform: `rotate(${discRot}deg)` }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#aaa" }} />
        </div>
      </div>

      {/* Bottom: handle + caption row */}
      <div style={{ position: "absolute", bottom: 100, left: 16, right: 80, pointerEvents: "none" }}>
        <div style={{ fontFamily: FF_BODY, fontWeight: 700, fontSize: 16, color: C.white, marginBottom: 6 }}>
          @{handle}
          <span style={{ fontFamily: FF_BODY, fontWeight: 400, color: "rgba(255,255,255,0.7)", fontSize: 14, marginLeft: 8 }}>· Follow</span>
        </div>
        {/* Sound row */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
          <span style={{ fontSize: 14 }}>♫</span>
          <span style={{ fontFamily: FF_BODY, fontSize: 13, color: C.white }}>{song}</span>
        </div>
      </div>
    </>
  );
}

// ─── Caption bubble ───────────────────────────────────────────────────────────
function Caption({ text, frame, startAt = 0 }: { text: string; frame: number; startAt?: number }) {
  const o = interpolate(spr(frame, startAt, 20, 120), [0, 1], [0, 1]);
  const y = interpolate(spr(frame, startAt, 20, 120), [0, 1], [12, 0]);
  return (
    <div style={{
      opacity: o, transform: `translateY(${y}px)`,
      background: "rgba(0,0,0,0.72)", borderRadius: 10,
      paddingLeft: 14, paddingRight: 14, paddingTop: 8, paddingBottom: 8,
      display: "inline-block", maxWidth: 700,
    }}>
      <span style={{ fontFamily: FF_BODY, fontWeight: 600, fontSize: 28, color: C.white, lineHeight: 1.3 }}>
        {text}
      </span>
    </div>
  );
}

// ─── Sound waveform ───────────────────────────────────────────────────────────
function Waveform() {
  const frame = useCurrentFrame();
  const bars = 5;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, height: 22 }}>
      {Array.from({ length: bars }).map((_, i) => {
        const h = 6 + Math.abs(Math.sin((frame * 0.25 + i * 0.8))) * 14;
        return (
          <div key={i} style={{ width: 4, height: h, borderRadius: 2, background: C.white, opacity: 0.85 }} />
        );
      })}
    </div>
  );
}

// ─── Star rating ─────────────────────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <span style={{ fontSize: 22, letterSpacing: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ opacity: i < count ? 1 : 0.25 }}>⭐</span>
      ))}
    </span>
  );
}

// ─── Pill badge ───────────────────────────────────────────────────────────────
function Pill({ text, color = C.gold, textColor = C.dark }: { text: string; color?: string; textColor?: string }) {
  return (
    <div style={{
      display: "inline-block", backgroundColor: color, borderRadius: 999,
      paddingLeft: 18, paddingRight: 18, paddingTop: 6, paddingBottom: 6,
    }}>
      <span style={{ fontFamily: FF_HEAD, fontWeight: 800, fontSize: 20, color: textColor, letterSpacing: "-0.3px" }}>
        {text}
      </span>
    </div>
  );
}

// ─── Intro scene ─────────────────────────────────────────────────────────────
function IntroScene() {
  const frame = useCurrentFrame();

  const bgPop  = spr(frame, 0, 18, 100);
  const emojiS = spr(frame, 4, 12, 180);
  const textY  = interpolate(spr(frame, 6, 14, 90), [0, 1], [30, 0]);
  const textO  = interpolate(spr(frame, 6, 14, 90), [0, 1], [0, 1]);
  const tagS   = spr(frame, 12, 14, 80);

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(160deg, #1a1208 0%, #2d2010 40%, #1a1208 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    }}>
      <Grain />
      <Vignette />

      {/* Warm gold circle glow */}
      <div style={{
        position: "absolute", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,198,0,0.18) 0%, transparent 70%)",
        transform: `scale(${bgPop})`,
      }} />

      {/* Big emoji */}
      <div style={{ transform: `scale(${emojiS})`, fontSize: 96, marginBottom: 28, lineHeight: 1 }}>📦</div>

      {/* Headline */}
      <div style={{ transform: `translateY(${textY}px)`, opacity: textO, textAlign: "center", padding: "0 60px" }}>
        <div style={{ fontFamily: FF_HEAD, fontWeight: 900, fontSize: 52, color: C.white, letterSpacing: "-2px", lineHeight: 1.05, marginBottom: 16 }}>
          Pindah rumah?
        </div>
        <div style={{ fontFamily: FF_HEAD, fontWeight: 900, fontSize: 44, color: C.gold, letterSpacing: "-1.5px", lineHeight: 1.05 }}>
          These boxes
        </div>
        <div style={{ fontFamily: FF_HEAD, fontWeight: 900, fontSize: 44, color: C.white, letterSpacing: "-1.5px", lineHeight: 1.05 }}>
          saved my life 🙌
        </div>
      </div>

      {/* Reviewer tag */}
      <div style={{ transform: `scale(${tagS})`, marginTop: 40, background: "rgba(255,255,255,0.1)", borderRadius: 999, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, backdropFilter: "blur(8px)" }}>
        <span style={{ fontFamily: FF_BODY, fontWeight: 700, fontSize: 18, color: C.white }}>
          @nurul_pindahrumah · 🇲🇾 KL
        </span>
      </div>

      {/* TikTok chrome */}
      <TikTokChrome handle="nurul_pindahrumah" song="original sound · Quinocycle" />
    </AbsoluteFill>
  );
}

// ─── Box review scene ─────────────────────────────────────────────────────────
interface BoxData {
  rank:     number;
  name:     string;
  size:     string;
  dims:     string;
  price:    string;
  use:      string;
  caption1: string;
  caption2: string;
  stars:    number;
  img:      string;
  accent:   string;
  emoji:    string;
  bgFrom:   string;
  bgTo:     string;
}

const BOXES: BoxData[] = [
  {
    rank: 1, name: "Small A4", size: "S", dims: "310 × 220 × 220 mm",
    price: "RM 3.00", stars: 4,
    use: "Baju, books & small stuff",
    caption1: "First — Small A4 box,\njust RM3 each! 👕📚",
    caption2: "Perfect for baju,\nbooks & small barang!",
    img: staticFile("box-new-s.png"),
    accent: C.gold, emoji: "👕",
    bgFrom: "#1a1208", bgTo: "#2d1f00",
  },
  {
    rank: 2, name: "Medium A3N", size: "M", dims: "440 × 310 × 230 mm",
    price: "RM 5.00", stars: 4,
    use: "Pinggan mangkuk & dapur stuff",
    caption1: "Medium A3N at RM5 —\ndouble wall, so kuat! 🍳",
    caption2: "Packed my whole dapur,\nsemua selamat! ✅",
    img: staticFile("box-new-m.png"),
    accent: "#d5e3d9", emoji: "🍳",
    bgFrom: "#0e1810", bgTo: "#1a2e1c",
  },
  {
    rank: 3, name: "Large NLN ⭐", size: "L", dims: "590 × 390 × 390 mm",
    price: "RM 8.00", stars: 5,
    use: "Washing machine & heavy barang",
    caption1: "And this Large NLN\nat RM8... GILA BESAR! 😱",
    caption2: "Packed my washing machine,\ntak rosak langsung! 💪",
    img: staticFile("box-new-l.png"),
    accent: C.gold, emoji: "🔥",
    bgFrom: "#1a1208", bgTo: "#3d2800",
  },
];

function BoxScene({ box }: { box: BoxData }) {
  const frame = useCurrentFrame();

  // Background pulse
  const bgScale = 1 + Math.sin(frame * 0.04) * 0.015;

  // Box entrance
  const boxS    = spr(frame, 4, 12, 70);
  const boxRot  = interpolate(spr(frame, 4, 12, 70), [0, 1], [box.rank % 2 === 0 ? 6 : -6, box.rank === 3 ? 2 : -1]);
  const boxY    = interpolate(spr(frame, 4, 12, 70), [0, 1], [80, 0]);

  // Rank badge
  const rankS   = spr(frame, 2, 16, 100);

  // Caption lines
  const cap1O   = interpolate(spr(frame, 8, 18, 100), [0, 1], [0, 1]);
  const cap2O   = interpolate(spr(frame, 18, 18, 100), [0, 1], [0, 1]);
  const cap2Y   = interpolate(spr(frame, 18, 18, 100), [0, 1], [10, 0]);

  // Price pop
  const priceS  = spr(frame, 14, 18, 120);

  // Stars
  const starsO  = interpolate(spr(frame, 20, 14, 80), [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(170deg, ${box.bgFrom} 0%, ${box.bgTo} 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      {/* Animated background glow */}
      <div style={{
        position: "absolute", inset: 0, transform: `scale(${bgScale})`,
        background: `radial-gradient(ellipse at 50% 40%, ${box.accent}22 0%, transparent 65%)`,
      }} />

      <Grain />
      <Vignette />

      {/* Rank badge */}
      <div style={{
        position: "absolute", top: 110, left: 28,
        transform: `scale(${rankS})`,
        background: box.accent, borderRadius: 999,
        paddingLeft: 18, paddingRight: 18, paddingTop: 8, paddingBottom: 8,
        display: "flex", alignItems: "center", gap: 8,
        boxShadow: `0 4px 20px ${box.accent}55`,
      }}>
        <span style={{ fontFamily: FF_HEAD, fontWeight: 900, fontSize: 22, color: box.rank === 2 ? C.dark : C.dark }}>
          #{box.rank} Pick {box.emoji}
        </span>
      </div>

      {/* Box image */}
      <div style={{
        position: "absolute", top: 200, left: 0, right: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: `translateY(${boxY}px) scale(${boxS}) rotate(${boxRot}deg)`,
      }}>
        {/* Glow behind box */}
        <div style={{
          position: "absolute", width: 460, height: 460, borderRadius: "50%",
          background: `radial-gradient(circle, ${box.accent}33 0%, transparent 70%)`,
        }} />
        <Img
          src={box.img}
          style={{ width: 680, height: 580, objectFit: "contain", position: "relative", zIndex: 1,
            filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.55))",
          }}
        />
      </div>

      {/* Bottom info panel */}
      <div style={{
        position: "absolute", bottom: 160, left: 0, right: 0, padding: "0 28px",
        display: "flex", flexDirection: "column", gap: 12,
      }}>
        {/* Caption 1 */}
        <div style={{ opacity: cap1O }}>
          <Caption text={box.caption1} frame={frame} startAt={8} />
        </div>

        {/* Caption 2 */}
        <div style={{ opacity: cap2O, transform: `translateY(${cap2Y}px)` }}>
          <Caption text={box.caption2} frame={frame} startAt={18} />
        </div>

        {/* Price + specs row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginTop: 4, transform: `scale(${priceS})`, transformOrigin: "left" }}>
          <Pill text={box.price} color={box.accent} textColor={C.dark} />
          <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 999, paddingLeft: 14, paddingRight: 14, paddingTop: 6, paddingBottom: 6 }}>
            <span style={{ fontFamily: FF_BODY, fontWeight: 600, fontSize: 16, color: C.white }}>
              Size {box.size} · {box.dims}
            </span>
          </div>
        </div>

        {/* Stars */}
        <div style={{ opacity: starsO }}>
          <Stars count={box.stars} />
        </div>
      </div>

      {/* Waveform indicator */}
      <div style={{ position: "absolute", bottom: 138, right: 88 }}>
        <Waveform />
      </div>

      {/* TikTok chrome */}
      <TikTokChrome handle="nurul_pindahrumah" song="original sound · Quinocycle" />
    </AbsoluteFill>
  );
}

// ─── Outro / CTA scene ───────────────────────────────────────────────────────
function OutroScene() {
  const frame = useCurrentFrame();

  const logoS   = spr(frame, 2, 14, 90);
  const headY   = interpolate(spr(frame, 6, 14, 80), [0, 1], [30, 0]);
  const headO   = interpolate(spr(frame, 6, 14, 80), [0, 1], [0, 1]);
  const urlS    = spr(frame, 12, 16, 100);
  const waS     = spr(frame, 18, 14, 90);
  const tagO    = interpolate(spr(frame, 24, 14, 80), [0, 1], [0, 1]);

  // Pulsing WA button
  const waPulse = 1 + Math.sin(frame * 0.2) * 0.04;

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(160deg, #1a1208 0%, #2d2010 50%, #1a1208 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "0 56px",
    }}>
      <Grain />
      <Vignette />

      {/* Gold glow */}
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}20 0%, transparent 65%)` }} />

      {/* Logo */}
      <div style={{ transform: `scale(${logoS})`, opacity: logoS, textAlign: "center", marginBottom: 36 }}>
        <div style={{ fontFamily: FF_HEAD, fontWeight: 900, fontSize: 46, color: C.white, letterSpacing: "-2px", lineHeight: 0.95 }}>
          QUINOCYCLE
        </div>
        <div style={{ fontFamily: FF_BODY, fontWeight: 600, fontSize: 13, letterSpacing: "0.22em", color: C.gold, textTransform: "uppercase", marginTop: 6 }}>
          Box &amp; Packaging
        </div>
      </div>

      {/* CTA headline */}
      <div style={{ transform: `translateY(${headY}px)`, opacity: headO, textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontFamily: FF_HEAD, fontWeight: 900, fontSize: 40, color: C.white, letterSpacing: "-1px", lineHeight: 1.1 }}>
          Nak pindah rumah?
        </div>
        <div style={{ fontFamily: FF_HEAD, fontWeight: 900, fontSize: 40, color: C.gold, letterSpacing: "-1px", lineHeight: 1.1, marginTop: 4 }}>
          Order wholesale today!
        </div>
      </div>

      {/* Website */}
      <div style={{ transform: `scale(${urlS})`, marginBottom: 20, background: "rgba(255,255,255,0.1)", borderRadius: 999, paddingLeft: 32, paddingRight: 32, paddingTop: 14, paddingBottom: 14, backdropFilter: "blur(8px)" }}>
        <span style={{ fontFamily: FF_HEAD, fontWeight: 800, fontSize: 26, color: C.white }}>quinocycle.com</span>
      </div>

      {/* WhatsApp CTA */}
      <div style={{ transform: `scale(${waS}) scale(${waPulse})`, background: "#25D366", borderRadius: 999, paddingLeft: 40, paddingRight: 40, paddingTop: 18, paddingBottom: 18, boxShadow: "0 8px 32px rgba(37,211,102,0.4)" }}>
        <span style={{ fontFamily: FF_HEAD, fontWeight: 800, fontSize: 24, color: C.white }}>
          💬 WhatsApp Order
        </span>
      </div>

      {/* Free delivery note */}
      <div style={{ opacity: tagO, textAlign: "center", marginTop: 28 }}>
        <span style={{ fontFamily: FF_BODY, fontSize: 18, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
          Free delivery · KL &amp; Selangor{"\n"}(orders above RM300)
        </span>
      </div>

      <TikTokChrome handle="nurul_pindahrumah" song="original sound · Quinocycle" />
    </AbsoluteFill>
  );
}

// ─── Flash transition ─────────────────────────────────────────────────────────
function FlashTransition() {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 3, 8], [0, 1, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: C.white, opacity: o, pointerEvents: "none" }} />
  );
}

// ─── Root video ───────────────────────────────────────────────────────────────
export function UGCReviewVideo() {
  return (
    <AbsoluteFill style={{ backgroundColor: C.dark }}>
      <style>{FONT_IMPORT}</style>

      <Sequence from={T_INTRO} durationInFrames={INTRO}>
        <IntroScene />
      </Sequence>

      {/* Flash between intro and box 1 */}
      <Sequence from={T_BOX1 - 5} durationInFrames={15}>
        <FlashTransition />
      </Sequence>

      <Sequence from={T_BOX1} durationInFrames={BOX1}>
        <BoxScene box={BOXES[0]} />
      </Sequence>

      <Sequence from={T_BOX2 - 5} durationInFrames={15}>
        <FlashTransition />
      </Sequence>

      <Sequence from={T_BOX2} durationInFrames={BOX2}>
        <BoxScene box={BOXES[1]} />
      </Sequence>

      <Sequence from={T_BOX3 - 5} durationInFrames={15}>
        <FlashTransition />
      </Sequence>

      <Sequence from={T_BOX3} durationInFrames={BOX3}>
        <BoxScene box={BOXES[2]} />
      </Sequence>

      <Sequence from={T_OUTRO - 5} durationInFrames={15}>
        <FlashTransition />
      </Sequence>

      <Sequence from={T_OUTRO} durationInFrames={OUTRO}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
}
