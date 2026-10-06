import React from "react";
import { AbsoluteFill } from "remotion";
import { KineticText, Logo, Scene, useDelayedSpring } from "../components";
import { theme } from "../theme";

export const CLOSE_DURATION = 150;

export const Close: React.FC = () => {
  const brandIn = useDelayedSpring(60, 14, 120);
  const builtIn = useDelayedSpring(82, 18, 110);

  return (
    <Scene duration={CLOSE_DURATION} fadeOut={20}>
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "center", gap: 10 }}
      >
        <KineticText text="People graduate." delay={4} fontSize={130} stagger={6} />
        <KineticText
          text="Knowledge shouldn't."
          delay={22}
          fontSize={130}
          color={theme.accent}
          stagger={6}
        />
        <div
          style={{
            marginTop: 80,
            display: "flex",
            alignItems: "center",
            gap: 26,
            opacity: brandIn,
            transform: `translateY(${(1 - brandIn) * 30}px)`,
          }}
        >
          <Logo size={88} />
          <span style={{ fontSize: 64, fontWeight: 900, letterSpacing: -2.5 }}>
            Club<span style={{ color: theme.accent }}>Brain</span>
          </span>
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: theme.muted,
            opacity: builtIn,
          }}
        >
          Built with <span style={{ color: theme.text, fontWeight: 700 }}>Mem0</span>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
