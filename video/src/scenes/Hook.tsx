import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { KineticText, Scene, fadeRange } from "../components";
import { theme } from "../theme";

export const HOOK_DURATION = 180;

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const firstLineExit = fadeRange(frame, 64, 82);
  const secondLineDissolve = fadeRange(frame, 152, 180);

  return (
    <Scene duration={HOOK_DURATION} fadeIn={0}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            position: "absolute",
            opacity: 1 - firstLineExit,
            transform: `translateY(${-firstLineExit * 80}px) scale(${1 - firstLineExit * 0.1})`,
            filter: `blur(${firstLineExit * 10}px)`,
          }}
        >
          <KineticText
            text="Every year, people graduate."
            delay={8}
            fontSize={120}
            highlight={["graduate"]}
            stagger={6}
          />
        </div>
        <div
          style={{
            position: "absolute",
            width: 1800,
            opacity: 1 - secondLineDissolve,
            letterSpacing: secondLineDissolve * 12,
            filter: `blur(${secondLineDissolve * 14}px)`,
            transform: `translateY(${-secondLineDissolve * 40}px)`,
          }}
        >
          <KineticText
            text="Their knowledge leaves with them."
            delay={78}
            fontSize={96}
            color={theme.text}
            highlight={["knowledge"]}
            stagger={5}
          />
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
