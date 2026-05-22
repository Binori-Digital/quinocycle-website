import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  staticFile,
} from "remotion";

// ─── Brand tokens ────────────────────────────────────────────────────────────
const BRAND = {
  surface:   "#fdf9f0",
  primary:   "#765a00",
  gold:      "#ffc600",
  dark:      "#1d1c16",
  green:     "#546159",
  muted:     "#81765f",
  container: "#f2ede4",
  cream:     "#ffe9a0",
} as const;

// ─── Font helpers ─────────────────────────────────────────────────────────────
const FF_HEAD = "'Epilogue', sans-serif";
const FF_BODY = "'Work Sans', sans-serif";

// ─── Top-3 box data ──────────────────────────────────────────────────────────
const BOXES = [
  {
    rank: 1,
    name: "Small Size New Carton Box A4",
    size: "S",
    dims: "310 × 220 × 220 mm",
    wall: "Single Wall",
    price: "RM 3.00",
    tag: "Clothes, books & small items",
    img: staticFile("box-new-s.png"),
    accent: "#ffc600",
    accentDark: "#765a00",
    emoji: "👔",
    highlight: "Lightweight &\nEasy to Pack",
  },
  {
    rank: 2,
    name: "Large Size New Carton Box NLN",
    size: "L",
    dims: "590 × 390 × 390 mm",
    wall: "Double Wall",
    price: "RM 8.00",
    tag: "Appliances, heavy goods",
    img: staticFile("box-new-l.png"),
    accent: "#546159",
    accentDark: "#2e3830",
    emoji: "📦",
    highlight: "Heavy-Duty\nDouble Wall",
  },
  {
    rank: 3,
    name: "Jumbo Size New Carton Box XXL",
    size: "XXL",
    dims: "860 × 460 × 560 mm",
    wall: "Double Wall",
    price: "RM 18.00",
    tag: "Furniture & oversized cargo",
    img: staticFile("box-new-xxl.png"),
    accent: "#4a3a00",
    accentDark: "#1d1c16",
    emoji: "🛋️",
    highlight: "Mega Capacity\nJumbo Cargo",
  },
];

// ─── Timings (frames @ 30 fps) ───────────────────────────────────────────────
const FPS = 30;
const INTRO_DUR    = 3  * FPS;  // 3s
const CARD_DUR     = 5  * FPS;  // 5s each
const OUTRO_DUR    = 4  * FPS;  // 4s
const CARD_1_START = INTRO_DUR;
const CARD_2_START = CARD_1_START + CARD_DUR;
const CARD_3_START = CARD_2_START + CARD_DUR;
const OUTRO_START  = CARD_3_START + CARD_DUR;
export const TOTAL_FRAMES = OUTRO_START + OUTRO_DUR;

// ─── Eased spring ────────────────────────────────────────────────────────────
function useSpr(frame: number, delay = 0) {
  return spring({ frame: frame - delay, fps: FPS, config: { damping: 14, stiffness: 80 } });
}

// ─── Intro scene ─────────────────────────────────────────────────────────────
function IntroScene() {
  const frame = useCurrentFrame();

  const titleY  = interpolate(useSpr(frame, 4),  [0, 1], [60, 0]);
  const titleO  = interpolate(useSpr(frame, 4),  [0, 1], [0, 1]);
  const subtitleY = interpolate(useSpr(frame, 10), [0, 1], [40, 0]);
  const subtitleO = interpolate(useSpr(frame, 10), [0, 1], [0, 1]);
  const badgeS  = useSpr(frame, 16);

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.dark, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 48px" }}>
      {/* Gold blob */}
      <div style={{ position: "absolute", top: -120, right: -80, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, #ffc600 0%, #765a00 60%, transparent 80%)", opacity: 0.25 }} />
      <div style={{ position: "absolute", bottom: -80, left: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, #ffc600 0%, transparent 70%)", opacity: 0.15 }} />

      {/* Brand chip */}
      <div style={{ transform: `scale(${badgeS})`, opacity: badgeS, marginBottom: 32, backgroundColor: BRAND.gold, borderRadius: 999, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8 }}>
        <span style={{ fontFamily: FF_BODY, fontWeight: 700, fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: BRAND.accentDark ?? BRAND.dark }}>
          Quinocycle Box &amp; Packaging
        </span>
      </div>

      {/* Headline */}
      <div style={{ transform: `translateY(${titleY}px)`, opacity: titleO, textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: FF_HEAD, fontWeight: 900, fontSize: 76, lineHeight: 0.9, color: BRAND.surface, letterSpacing: "-3px" }}>
          TOP 3
        </div>
        <div style={{ fontFamily: FF_HEAD, fontWeight: 900, fontSize: 44, lineHeight: 1, color: BRAND.gold, letterSpacing: "-1.5px", marginTop: 8 }}>
          BOXES FOR
        </div>
        <div style={{ fontFamily: FF_HEAD, fontWeight: 900, fontSize: 72, lineHeight: 0.9, color: BRAND.surface, letterSpacing: "-3px", marginTop: 4 }}>
          MOVING
        </div>
      </div>

      {/* Sub */}
      <div style={{ transform: `translateY(${subtitleY}px)`, opacity: subtitleO, textAlign: "center", marginTop: 24 }}>
        <p style={{ fontFamily: FF_BODY, fontWeight: 400, fontSize: 22, color: "#b0a88a", lineHeight: 1.5 }}>
          New carton boxes · Wholesale prices{"\n"}KL &amp; Selangor delivery
        </p>
      </div>
    </AbsoluteFill>
  );
}

// ─── Box card scene ───────────────────────────────────────────────────────────
function BoxCardScene({ box, index }: { box: typeof BOXES[0]; index: number }) {
  const frame = useCurrentFrame();

  const slideUp  = interpolate(useSpr(frame, 3), [0, 1], [80, 0]);
  const fadeIn   = interpolate(useSpr(frame, 3), [0, 1], [0, 1]);
  const imgScale = interpolate(useSpr(frame, 6), [0, 1], [0.8, 1]);
  const imgO     = interpolate(useSpr(frame, 6), [0, 1], [0, 1]);
  const detailY  = interpolate(useSpr(frame, 10), [0, 1], [30, 0]);
  const detailO  = interpolate(useSpr(frame, 10), [0, 1], [0, 1]);
  const priceS   = useSpr(frame, 14);
  const tagO     = interpolate(useSpr(frame, 18), [0, 1], [0, 1]);

  const isLight = index === 0;
  const bg = isLight ? BRAND.surface : BRAND.dark;
  const fg = isLight ? BRAND.dark : BRAND.surface;
  const mutedFg = isLight ? BRAND.muted : "#b0a88a";

  return (
    <AbsoluteFill style={{ backgroundColor: bg, display: "flex", flexDirection: "column", padding: "56px 48px" }}>
      {/* Accent strip */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, backgroundColor: box.accent }} />

      {/* Rank badge */}
      <div style={{ transform: `translateY(${slideUp}px)`, opacity: fadeIn, display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: box.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: FF_HEAD, fontWeight: 900, fontSize: 22, color: isLight ? BRAND.dark : BRAND.surface }}>#{box.rank}</span>
        </div>
        <div>
          <div style={{ fontFamily: FF_BODY, fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: box.accent, marginBottom: 2 }}>
            Top Pick for Moving
          </div>
          <div style={{ fontFamily: FF_HEAD, fontWeight: 800, fontSize: 22, color: fg, lineHeight: 1 }}>
            Size {box.size} — {box.wall}
          </div>
        </div>
      </div>

      {/* Box image */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${imgScale})`, opacity: imgO, position: "relative" }}>
        {/* Glow */}
        <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${box.accent}44 0%, transparent 70%)` }} />
        <Img src={box.img} style={{ maxWidth: 500, maxHeight: 420, objectFit: "contain", position: "relative", zIndex: 1 }} />
      </div>

      {/* Info */}
      <div style={{ transform: `translateY(${detailY}px)`, opacity: detailO }}>
        <h2 style={{ fontFamily: FF_HEAD, fontWeight: 900, fontSize: 30, color: fg, letterSpacing: "-0.5px", lineHeight: 1.1, marginBottom: 8 }}>
          {box.name}
        </h2>
        <p style={{ fontFamily: FF_BODY, fontSize: 18, color: mutedFg, marginBottom: 20 }}>
          {box.dims}
        </p>

        {/* Highlight pill */}
        <div style={{ display: "inline-block", backgroundColor: box.accent + "22", border: `1.5px solid ${box.accent}55`, borderRadius: 12, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, marginBottom: 20 }}>
          <span style={{ fontFamily: FF_BODY, fontWeight: 600, fontSize: 15, color: box.accent, whiteSpace: "pre" }}>
            {box.highlight}
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: fg + "18", marginBottom: 20 }} />

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          {/* Use case tag */}
          <div style={{ opacity: tagO }}>
            <div style={{ fontFamily: FF_BODY, fontWeight: 600, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: mutedFg, marginBottom: 4 }}>
              Best for
            </div>
            <div style={{ fontFamily: FF_BODY, fontSize: 17, color: fg, lineHeight: 1.3 }}>
              {box.tag}
            </div>
          </div>
          {/* Price */}
          <div style={{ transform: `scale(${priceS})`, textAlign: "right" }}>
            <div style={{ fontFamily: FF_BODY, fontWeight: 600, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: mutedFg, marginBottom: 2 }}>
              from
            </div>
            <div style={{ fontFamily: FF_HEAD, fontWeight: 900, fontSize: 40, color: box.accent, letterSpacing: "-1px", lineHeight: 1 }}>
              {box.price}
            </div>
            <div style={{ fontFamily: FF_BODY, fontSize: 13, color: mutedFg }}>per box</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Outro / CTA scene ───────────────────────────────────────────────────────
function OutroScene() {
  const frame = useCurrentFrame();

  const logoS  = useSpr(frame, 4);
  const headY  = interpolate(useSpr(frame, 8),  [0, 1], [40, 0]);
  const headO  = interpolate(useSpr(frame, 8),  [0, 1], [0, 1]);
  const btnS   = useSpr(frame, 14);
  const tagO   = interpolate(useSpr(frame, 20), [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.gold, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 48px" }}>
      {/* Dark texture blobs */}
      <div style={{ position: "absolute", top: -100, left: -80, width: 350, height: 350, borderRadius: "50%", backgroundColor: "#00000015" }} />
      <div style={{ position: "absolute", bottom: -60, right: -60, width: 280, height: 280, borderRadius: "50%", backgroundColor: "#00000012" }} />

      {/* Brand logo area */}
      <div style={{ transform: `scale(${logoS})`, opacity: logoS, textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontFamily: FF_HEAD, fontWeight: 900, fontSize: 52, color: BRAND.dark, letterSpacing: "-2px", lineHeight: 0.9 }}>
          QUINOCYCLE
        </div>
        <div style={{ fontFamily: FF_BODY, fontWeight: 600, fontSize: 13, letterSpacing: "0.25em", color: "#765a00", textTransform: "uppercase", marginTop: 8 }}>
          Box &amp; Packaging
        </div>
      </div>

      {/* CTA headline */}
      <div style={{ transform: `translateY(${headY}px)`, opacity: headO, textAlign: "center", marginBottom: 36 }}>
        <p style={{ fontFamily: FF_HEAD, fontWeight: 800, fontSize: 36, color: BRAND.dark, letterSpacing: "-1px", lineHeight: 1.1 }}>
          Ready to move?{"\n"}Order wholesale today.
        </p>
      </div>

      {/* WhatsApp CTA */}
      <div style={{ transform: `scale(${btnS})`, backgroundColor: "#25D366", borderRadius: 999, paddingLeft: 40, paddingRight: 40, paddingTop: 18, paddingBottom: 18, display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
        <span style={{ fontFamily: FF_HEAD, fontWeight: 800, fontSize: 20, color: "#fff", letterSpacing: "-0.2px" }}>
          Order via WhatsApp
        </span>
      </div>

      {/* Taglines */}
      <div style={{ opacity: tagO, textAlign: "center" }}>
        <p style={{ fontFamily: FF_BODY, fontSize: 16, color: "#765a00", lineHeight: 1.8 }}>
          Free delivery · KL &amp; Selangor{"\n"}Min. order 20–200 boxes
        </p>
        <p style={{ fontFamily: FF_BODY, fontWeight: 700, fontSize: 14, letterSpacing: "0.1em", color: BRAND.dark, textTransform: "uppercase", marginTop: 16 }}>
          quinocycle.com
        </p>
      </div>
    </AbsoluteFill>
  );
}

// ─── Root composition ─────────────────────────────────────────────────────────
export function MovingBoxesVideo() {
  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.dark }}>
      {/* Embed Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@400;700;800;900&family=Work+Sans:wght@300;400;500;600;700&display=swap');
      `}</style>

      <Sequence from={0} durationInFrames={INTRO_DUR}>
        <IntroScene />
      </Sequence>

      <Sequence from={CARD_1_START} durationInFrames={CARD_DUR}>
        <BoxCardScene box={BOXES[0]} index={0} />
      </Sequence>

      <Sequence from={CARD_2_START} durationInFrames={CARD_DUR}>
        <BoxCardScene box={BOXES[1]} index={1} />
      </Sequence>

      <Sequence from={CARD_3_START} durationInFrames={CARD_DUR}>
        <BoxCardScene box={BOXES[2]} index={2} />
      </Sequence>

      <Sequence from={OUTRO_START} durationInFrames={OUTRO_DUR}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
}
