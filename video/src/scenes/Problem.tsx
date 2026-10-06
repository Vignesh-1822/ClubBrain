import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Avatar, KineticText, Scene, fadeRange } from "../components";
import { theme } from "../theme";

export const PROBLEM_DURATION = 270;

interface NoiseMessage {
  initials: string;
  color: string;
  text: string;
  side: "left" | "right";
  isKey?: boolean;
}

const MESSAGES: NoiseMessage[] = [
  { initials: "JT", color: "#7DD3FC", text: "meeting moved to 7?", side: "left" },
  { initials: "PR", color: "#F9A8D4", text: "who has the slides lol", side: "right" },
  { initials: "DK", color: "#86EFAC", text: "Who handled Google sponsorship?", side: "left", isKey: true },
  { initials: "AL", color: "#FDBA74", text: "venmo me for pizza 🍕", side: "right" },
  { initials: "SM", color: "#C4B5FD", text: "can someone book a room", side: "left" },
  { initials: "RN", color: "#FCA5A5", text: "Which caterer was late?", side: "right", isKey: true },
  { initials: "JT", color: "#7DD3FC", text: "👍👍", side: "left" },
  { initials: "MB", color: "#5EEAD4", text: "did anyone email the dean?", side: "right" },
  { initials: "KC", color: "#FDE68A", text: "Why did we stop using Memorial Union?", side: "left", isKey: true },
  { initials: "PR", color: "#F9A8D4", text: "idk ask last year's board", side: "right" },
  { initials: "AL", color: "#FDBA74", text: "they graduated 💀", side: "left" },
  { initials: "SM", color: "#C4B5FD", text: "anyone have the sponsor deck?", side: "right" },
  { initials: "DK", color: "#86EFAC", text: "what was the budget last time?", side: "left" },
  { initials: "RN", color: "#FCA5A5", text: "no clue tbh", side: "right" },
];

const ROW_HEIGHT = 128;

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const scroll = frame * 4.5;
  const textPhase = fadeRange(frame, 150, 185);

  return (
    <Scene duration={PROBLEM_DURATION}>
      <AbsoluteFill
        style={{
          opacity: 1 - textPhase * 0.75,
          filter: `blur(${textPhase * 6}px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 360,
            width: 1200,
            top: 640 - scroll,
          }}
        >
          {MESSAGES.map((message, index) => {
            const rowTop = 640 - scroll + index * ROW_HEIGHT;
            const appear = 1 - fadeRange(rowTop, 920, 1080);
            const darkness = 1 - fadeRange(rowTop, 40, 380);
            const isLeft = message.side === "left";
            return (
              <div
                key={`${message.text}-${index}`}
                style={{
                  height: ROW_HEIGHT,
                  display: "flex",
                  justifyContent: isLeft ? "flex-start" : "flex-end",
                  alignItems: "center",
                  opacity: appear * (1 - darkness * 0.92),
                  filter: `blur(${darkness * 5}px)`,
                  transform: `scale(${message.isKey ? 1.04 : 1})`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: isLeft ? "row" : "row-reverse",
                    alignItems: "center",
                    gap: 18,
                  }}
                >
                  <Avatar initials={message.initials} color={message.color} size={54} />
                  <div
                    style={{
                      backgroundColor: message.isKey ? "#262626" : theme.panel,
                      border: message.isKey
                        ? `2px solid ${theme.accent}`
                        : "1px solid #2A2A2A",
                      borderRadius: 26,
                      padding: "20px 30px",
                      fontSize: message.isKey ? 38 : 30,
                      fontWeight: message.isKey ? 600 : 400,
                      color: message.isKey ? theme.text : "#BDBDBD",
                    }}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, #000 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 75%, #000 100%)",
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "center", gap: 20 }}
      >
        <KineticText text="Buried in group chats." delay={160} fontSize={112} />
        <KineticText
          text="Lost forever."
          delay={200}
          fontSize={112}
          color={theme.muted}
        />
      </AbsoluteFill>
    </Scene>
  );
};
