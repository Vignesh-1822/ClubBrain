import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Logo, Scene, fadeRange, useDelayedSpring } from "../components";
import { theme } from "../theme";

export const INTRO_DURATION = 180;

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const logoPop = useDelayedSpring(6, 11, 130);
  const brainDraw = fadeRange(frame, 14, 50);
  const titleIn = useDelayedSpring(30, 16, 120);
  const taglineIn = useDelayedSpring(55, 18, 110);
  const poweredIn = useDelayedSpring(85, 18, 110);
  const pulse = fadeRange(frame, 40, 90);

  return (
    <Scene duration={INTRO_DURATION}>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ position: "relative", marginBottom: 56 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `3px solid ${theme.accent}`,
              transform: `scale(${1 + pulse * 0.9})`,
              opacity: (1 - pulse) * 0.6 * logoPop,
            }}
          />
          <div
            style={{
              transform: `scale(${logoPop}) rotate(${(1 - logoPop) * -90}deg)`,
            }}
          >
            <Logo size={220} drawProgress={brainDraw} />
          </div>
        </div>
        <div
          style={{
            fontSize: 150,
            fontWeight: 900,
            letterSpacing: -6,
            opacity: titleIn,
            transform: `translateY(${(1 - titleIn) * 50}px)`,
          }}
        >
          Club<span style={{ color: theme.accent }}>Brain</span>
        </div>
        <div
          style={{
            fontSize: 50,
            fontWeight: 500,
            color: "#D6D6D6",
            marginTop: 16,
            opacity: taglineIn,
            transform: `translateY(${(1 - taglineIn) * 30}px)`,
          }}
        >
          Give your organization a memory.
        </div>
        <div
          style={{
            marginTop: 56,
            padding: "12px 28px",
            borderRadius: 999,
            border: "1px solid #333",
            backgroundColor: theme.panel,
            fontSize: 26,
            color: theme.muted,
            opacity: poweredIn,
            transform: `scale(${0.8 + poweredIn * 0.2})`,
          }}
        >
          Powered by <span style={{ color: theme.text, fontWeight: 700 }}>Mem0</span>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
