import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { KineticText, Logo, Scene, fadeRange, useDelayedSpring } from "../components";
import { CHANNEL_COLORS, ChannelId, ChannelTile } from "../channels";
import { theme } from "../theme";

export const GATHER_DURATION = 240;

const ICON_X = 250;
const ICON_SIZE = 108;
const LOGO_X = 840;
const CENTER_Y = 590;
const LOGO_SIZE = 210;
const CHIP_LEFT = 1110;

interface SourceNode {
  channel: ChannelId;
  y: number;
  snippet: string;
}

const SOURCES: SourceNode[] = [
  { channel: "whatsapp", y: 335, snippet: "Memorial Union entry was chaos 😩" },
  { channel: "discord", y: 505, snippet: "Spice Kitchen showed up 90 min late" },
  { channel: "slack", y: 675, snippet: "Google said yes after Priya's intro" },
  { channel: "gmail", y: 845, snippet: "requests need 8 weeks lead time" },
];

const MEMORY_CHIPS: string[] = [
  "⚠️ Avoid Memorial Union for 150+",
  "🤝 Google: 6–8 wk outreach",
  "🎓 Priya Nair '23 — Google intro",
  "🛡️ Verify attendees by student ID",
  "🍽️ Spice Kitchen runs late",
];

const CHIP_HEIGHT = 76;
const CHIP_GAP = 22;
const LINE_DRAW_AT = 34;
const SNIPPET_AT = 62;
const SNIPPET_STAGGER = 16;
const SNIPPET_FLIGHT = 34;
const CHIP_AT = 118;
const CHIP_STAGGER = 13;

const ease = Easing.inOut(Easing.cubic);

const lerp = (from: number, to: number, progress: number): number =>
  from + (to - from) * progress;

const ConnectorLines: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      {SOURCES.map((source, index) => {
        const startX = ICON_X + ICON_SIZE / 2 + 10;
        const endX = LOGO_X - LOGO_SIZE / 2 - 10;
        const draw = fadeRange(frame, LINE_DRAW_AT + index * 5, LINE_DRAW_AT + 24 + index * 5);
        const color = CHANNEL_COLORS[source.channel];
        const particles = [0, 1, 2].map((particleIndex) => {
          const cycle = ((frame - LINE_DRAW_AT - 20) / 36 + particleIndex / 3 + index * 0.13) % 1;
          const t = cycle < 0 ? cycle + 1 : cycle;
          const visible = frame > LINE_DRAW_AT + 20 ? Math.sin(t * Math.PI) : 0;
          return { t, visible, particleIndex };
        });
        return (
          <g key={source.channel}>
            <line
              x1={startX}
              y1={source.y}
              x2={endX}
              y2={CENTER_Y}
              stroke={color === CHANNEL_COLORS.slack ? "#ECB22E" : color}
              strokeOpacity={0.55}
              strokeWidth={3}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - draw}
            />
            {particles.map(({ t, visible, particleIndex }) => (
              <circle
                key={particleIndex}
                cx={lerp(startX, endX, t)}
                cy={lerp(source.y, CENTER_Y, t)}
                r={6}
                fill={theme.accent}
                opacity={visible * 0.9}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

const FlyingSnippet: React.FC<{ source: SourceNode; index: number }> = ({ source, index }) => {
  const frame = useCurrentFrame();
  const start = SNIPPET_AT + index * SNIPPET_STAGGER;
  const popIn = fadeRange(frame, start - 14, start);
  const flight = interpolate(frame, [start, start + SNIPPET_FLIGHT], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const startX = ICON_X + ICON_SIZE / 2 + 30;
  const startY = source.y - 70;
  const x = lerp(startX, LOGO_X - 60, flight);
  const y = lerp(startY, CENTER_Y - 20, flight);
  const opacity = popIn * (1 - fadeRange(frame, start + SNIPPET_FLIGHT - 10, start + SNIPPET_FLIGHT));
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        transform: `scale(${(0.85 + popIn * 0.15) * (1 - flight * 0.75)})`,
        transformOrigin: "left center",
        whiteSpace: "nowrap",
        fontSize: 22,
        color: "#D8D8D8",
        backgroundColor: "#202020",
        borderLeft: `4px solid ${
          source.channel === "slack" ? "#ECB22E" : CHANNEL_COLORS[source.channel]
        }`,
        borderRadius: 12,
        padding: "8px 16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
      }}
    >
      “{source.snippet}”
    </div>
  );
};

const SourceTile: React.FC<{ source: SourceNode; index: number }> = ({ source, index }) => {
  const tileIn = useDelayedSpring(10 + index * 6, 13, 140);
  return (
    <div
      style={{
        position: "absolute",
        left: ICON_X - ICON_SIZE / 2,
        top: source.y - ICON_SIZE / 2,
        opacity: tileIn,
        transform: `translateX(${(1 - tileIn) * -80}px) scale(${tileIn})`,
      }}
    >
      <ChannelTile channel={source.channel} size={ICON_SIZE} />
    </div>
  );
};

const MemoryChip: React.FC<{ text: string; index: number }> = ({ text, index }) => {
  const progress = useDelayedSpring(CHIP_AT + index * CHIP_STAGGER, 16, 110);
  const total = MEMORY_CHIPS.length * CHIP_HEIGHT + (MEMORY_CHIPS.length - 1) * CHIP_GAP;
  const slotTop = CENTER_Y - total / 2 + index * (CHIP_HEIGHT + CHIP_GAP);
  const fromDx = LOGO_X - CHIP_LEFT - 40;
  const fromDy = CENTER_Y - CHIP_HEIGHT / 2 - slotTop;
  return (
    <div
      style={{
        position: "absolute",
        left: CHIP_LEFT,
        top: slotTop,
        height: CHIP_HEIGHT,
        display: "flex",
        alignItems: "center",
        padding: "0 28px",
        borderRadius: CHIP_HEIGHT / 2,
        backgroundColor: theme.panel,
        border: `1.5px solid rgba(238, 242, 155, ${0.25 + progress * 0.45})`,
        fontSize: 31,
        fontWeight: 600,
        whiteSpace: "nowrap",
        opacity: Math.min(1, progress * 1.4),
        transform: `translate(${(1 - progress) * fromDx}px, ${(1 - progress) * fromDy}px) scale(${
          0.3 + progress * 0.7
        })`,
        transformOrigin: "left center",
      }}
    >
      {text}
    </div>
  );
};

export const Gather: React.FC = () => {
  const frame = useCurrentFrame();
  const logoIn = useDelayedSpring(4, 12, 110);
  const pulses = SOURCES.map((_, index) => {
    const absorbAt = SNIPPET_AT + index * SNIPPET_STAGGER + SNIPPET_FLIGHT;
    return Math.max(0, 1 - Math.abs(frame - absorbAt) / 8);
  }).reduce((total, value) => Math.max(total, value), 0);
  const mem0In = useDelayedSpring(176, 18, 110);

  return (
    <Scene duration={GATHER_DURATION}>
      <ConnectorLines />
      {SOURCES.map((source, index) => (
        <SourceTile key={source.channel} source={source} index={index} />
      ))}
      {SOURCES.map((source, index) => (
        <FlyingSnippet key={source.channel} source={source} index={index} />
      ))}
      <div
        style={{
          position: "absolute",
          left: LOGO_X - LOGO_SIZE / 2,
          top: CENTER_Y - LOGO_SIZE / 2,
          transform: `scale(${logoIn * (1 + pulses * 0.08)})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -40,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(238,242,155,0.28) 0%, rgba(238,242,155,0) 70%)",
            opacity: 0.4 + pulses * 0.6,
          }}
        />
        <Logo size={LOGO_SIZE} drawProgress={fadeRange(frame, 8, 40)} />
      </div>
      {MEMORY_CHIPS.map((text, index) => (
        <MemoryChip key={text} text={text} index={index} />
      ))}
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 70 }}>
        <KineticText
          text="ClubBrain pulls it all into one club memory."
          delay={14}
          fontSize={64}
          highlight={["memory"]}
          stagger={4}
        />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          bottom: 56,
          width: "100%",
          textAlign: "center",
          fontSize: 28,
          color: theme.muted,
          opacity: mem0In,
          transform: `translateY(${(1 - mem0In) * 16}px)`,
        }}
      >
        Powered by <span style={{ color: theme.text, fontWeight: 700 }}>Mem0</span>
      </div>
    </Scene>
  );
};
