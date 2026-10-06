import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Avatar, KineticText, Panel, Scene, fadeRange, useDelayedSpring } from "../components";
import { theme } from "../theme";

export const HANDOFF_DURATION = 180;

interface PresidentCardProps {
  year: string;
  name: string;
  initials: string;
  color: string;
  progress: number;
  dimmed: number;
  badge?: string;
}

const PresidentCard: React.FC<PresidentCardProps> = ({
  year,
  name,
  initials,
  color,
  progress,
  dimmed,
  badge,
}) => (
  <Panel
    style={{
      width: 560,
      padding: "40px 44px",
      display: "flex",
      alignItems: "center",
      gap: 30,
      opacity: progress * (1 - dimmed * 0.6),
      transform: `translateY(${(1 - progress) * 60}px) scale(${1 - dimmed * 0.06})`,
      filter: `grayscale(${dimmed})`,
    }}
  >
    <Avatar initials={initials} color={color} size={110} />
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 26, color: theme.muted, fontWeight: 600 }}>
        {year} President
      </span>
      <span style={{ fontSize: 60, fontWeight: 800, letterSpacing: -2 }}>{name}</span>
      {badge ? (
        <span
          style={{
            alignSelf: "flex-start",
            marginTop: 6,
            fontSize: 20,
            fontWeight: 700,
            padding: "5px 14px",
            borderRadius: 999,
            backgroundColor: theme.accent,
            color: "#000",
          }}
        >
          {badge}
        </span>
      ) : null}
    </div>
  </Panel>
);

export const Handoff: React.FC = () => {
  const frame = useCurrentFrame();
  const headingUp = fadeRange(frame, 30, 50);
  const mayaIn = useDelayedSpring(42, 16, 120);
  const sarahIn = useDelayedSpring(72, 14, 120);
  const mayaDim = fadeRange(frame, 80, 105);
  const arrowIn = fadeRange(frame, 62, 80);
  const captionIn = useDelayedSpring(112, 18, 120);

  return (
    <Scene duration={HANDOFF_DURATION}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            position: "absolute",
            top: interpolateTop(headingUp),
            width: "100%",
          }}
        >
          <KineticText
            text="One year later…"
            delay={2}
            fontSize={110 - headingUp * 40}
            color={headingUp > 0.5 ? theme.muted : theme.text}
            stagger={5}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 50, marginTop: 40 }}>
          <PresidentCard
            year="2025"
            name="Maya"
            initials="MA"
            color="#C4B5FD"
            progress={mayaIn}
            dimmed={mayaDim}
            badge="Graduated 🎓"
          />
          <div
            style={{
              fontSize: 70,
              color: theme.accent,
              opacity: arrowIn,
              transform: `translateX(${(1 - arrowIn) * -30}px)`,
            }}
          >
            →
          </div>
          <PresidentCard
            year="2026"
            name="Sarah"
            initials="SA"
            color="#7DD3FC"
            progress={sarahIn}
            dimmed={0}
            badge="New 👋"
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 170,
            fontSize: 54,
            fontWeight: 700,
            letterSpacing: -1.5,
            opacity: captionIn,
            transform: `translateY(${(1 - captionIn) * 30}px)`,
          }}
        >
          Sarah just joined the exec board.{" "}
          <span style={{ color: theme.muted }}>She knows nothing yet.</span>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

const interpolateTop = (progress: number): number => 470 - progress * 290;
