import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { KineticText, Scene } from "../components";
import { CHANNEL_ORDER, ChannelTile } from "../channels";

export const PUNCHLINE_DURATION = 180;

const GHOST_POSITIONS = [
  { x: 260, y: 220 },
  { x: 1560, y: 200 },
  { x: 300, y: 760 },
  { x: 1540, y: 780 },
];

export const Punchline: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene duration={PUNCHLINE_DURATION}>
      {CHANNEL_ORDER.map((channel, index) => {
        const position = GHOST_POSITIONS[index];
        const drift = Math.sin(frame / 30 + index * 1.4) * 10;
        return (
          <div
            key={channel}
            style={{
              position: "absolute",
              left: position.x,
              top: position.y + drift,
              opacity: 0.14,
              filter: "blur(1.5px)",
              transform: `rotate(${(index % 2 === 0 ? -1 : 1) * 8}deg)`,
            }}
          >
            <ChannelTile channel={channel} size={110} />
          </div>
        );
      })}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 30 }}>
        <KineticText text="Rahul never saw those chats." delay={8} fontSize={104} stagger={5} />
        <KineticText
          text="The club remembered."
          delay={50}
          fontSize={118}
          highlight={["remembered"]}
          stagger={7}
        />
      </AbsoluteFill>
    </Scene>
  );
};
