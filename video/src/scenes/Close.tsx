import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { KineticText, Logo, Scene, fadeRange, useDelayedSpring } from "../components";
import { CHANNEL_ORDER, ChannelTile } from "../channels";
import { theme } from "../theme";

export const CLOSE_DURATION = 180;

const CENTER_X = 960;
const CENTER_Y = 540;
const ABSORB_AT = 52;
const LOGO_SIZE = 170;
const TILE_SIZE = 96;

const OrbitingTile: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const enter = useDelayedSpring(index * 3, 14, 120);
  const collapse = interpolate(frame, [8, ABSORB_AT], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const radius = 360 * (1 - collapse);
  const angle = (index * Math.PI) / 2 - Math.PI / 4 + frame * 0.045 + collapse * 1.2;
  const x = CENTER_X + Math.cos(angle) * radius - TILE_SIZE / 2;
  const y = CENTER_Y + Math.sin(angle) * radius - TILE_SIZE / 2;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: enter * (1 - fadeRange(frame, ABSORB_AT - 8, ABSORB_AT)),
        transform: `scale(${enter * (1 - collapse * 0.7)})`,
      }}
    >
      <ChannelTile channel={CHANNEL_ORDER[index]} size={TILE_SIZE} />
    </div>
  );
};

export const Close: React.FC = () => {
  const frame = useCurrentFrame();
  const logoIn = useDelayedSpring(0, 14, 120);
  const pop = useDelayedSpring(ABSORB_AT, 8, 200);
  const popScale = 1 + Math.max(0, 1 - Math.abs(frame - ABSORB_AT - 4) / 10) * 0.18;
  const rise = interpolate(frame, [ABSORB_AT + 14, ABSORB_AT + 40], [0, -250], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const ring = fadeRange(frame, ABSORB_AT, ABSORB_AT + 26);
  const brandIn = useDelayedSpring(ABSORB_AT + 70, 18, 110);

  return (
    <Scene duration={CLOSE_DURATION} fadeOut={20}>
      {[0, 1, 2, 3].map((index) => (
        <OrbitingTile key={index} index={index} />
      ))}
      <div
        style={{
          position: "absolute",
          left: CENTER_X - LOGO_SIZE / 2,
          top: CENTER_Y - LOGO_SIZE / 2 + rise,
          transform: `scale(${(0.55 + logoIn * 0.25 + pop * 0.2) * popScale})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: LOGO_SIZE / 2 - 100 - ring * 160,
            top: LOGO_SIZE / 2 - 100 - ring * 160,
            width: 200 + ring * 320,
            height: 200 + ring * 320,
            borderRadius: "50%",
            border: `3px solid ${theme.accent}`,
            opacity: frame >= ABSORB_AT ? (1 - ring) * 0.7 : 0,
          }}
        />
        <Logo size={LOGO_SIZE} />
      </div>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 170, gap: 8 }}>
        <KineticText text="People graduate." delay={ABSORB_AT + 24} fontSize={116} stagger={6} />
        <KineticText
          text="Knowledge shouldn't."
          delay={ABSORB_AT + 40}
          fontSize={116}
          color={theme.accent}
          stagger={6}
        />
        <div
          style={{
            marginTop: 44,
            fontSize: 36,
            color: theme.muted,
            opacity: brandIn,
            transform: `translateY(${(1 - brandIn) * 20}px)`,
          }}
        >
          <span style={{ fontWeight: 900, color: theme.text, letterSpacing: -1 }}>
            Club<span style={{ color: theme.accent }}>Brain</span>
          </span>{" "}
          — built with <span style={{ color: theme.text, fontWeight: 700 }}>Mem0</span>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
