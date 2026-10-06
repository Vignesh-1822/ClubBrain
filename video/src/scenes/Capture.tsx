import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import {
  ChatHeader,
  ChatMessage,
  Panel,
  Scene,
  fadeRange,
  useDelayedSpring,
} from "../components";
import { theme } from "../theme";

export const CAPTURE_DURATION = 300;

interface MemoryChip {
  icon: string;
  label: string;
  text: string;
  appearAt: number;
}

const CHIPS: MemoryChip[] = [
  { icon: "🤝", label: "Sponsor", text: "Google outreach ~7 weeks before event", appearAt: 150 },
  { icon: "⚠️", label: "Warning", text: "Memorial Union: not for 150+ people", appearAt: 172 },
  { icon: "👤", label: "People", text: "Alex owns the Google relationship", appearAt: 194 },
];

export const Capture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const captionIn = useDelayedSpring(0, 18, 120);
  const chatIn = useDelayedSpring(4, 18, 110);
  const memoryPanelIn = useDelayedSpring(20, 18, 110);
  const detectIn = useDelayedSpring(100, 13, 140);
  const savedProgress = fadeRange(frame, 118, 140);
  const scanX = fadeRange(frame, 100, 135);

  return (
    <Scene duration={CAPTURE_DURATION}>
      <AbsoluteFill style={{ padding: "0 110px", justifyContent: "center" }}>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: -2,
            opacity: captionIn,
            transform: `translateY(${(1 - captionIn) * 20}px)`,
            marginBottom: 46,
          }}
        >
          Your club talks. <span style={{ color: theme.accent }}>ClubBrain remembers.</span>
        </div>
        <div style={{ display: "flex", gap: 44, alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, width: 1000 }}>
            <Panel
              style={{
                padding: 44,
                opacity: chatIn,
                transform: `translateX(${(1 - chatIn) * -60}px)`,
              }}
            >
              <ChatHeader channel="# exec-board" subtitle="ACM Student Chapter · 2025" />
              <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
                <ChatMessage
                  name="Alex"
                  initials="AL"
                  color="#FDBA74"
                  appearAt={18}
                  time="Mar 12, 2025"
                >
                  Google sponsorship worked well. We reached out ~7 weeks before the event.
                </ChatMessage>
                <ChatMessage
                  name="Maya"
                  initials="MA"
                  color="#C4B5FD"
                  appearAt={58}
                  time="Mar 12, 2025"
                >
                  Avoid Memorial Union for events over 150 people.
                </ChatMessage>
              </div>
            </Panel>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                gap: 22,
                padding: "26px 34px",
                borderRadius: theme.radius,
                backgroundColor: "rgba(238, 242, 155, 0.08)",
                border: `2px solid ${theme.accent}`,
                opacity: detectIn,
                transform: `scale(${0.85 + detectIn * 0.15})`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: `${scanX * 110 - 10}%`,
                  width: 120,
                  background:
                    "linear-gradient(90deg, rgba(238,242,155,0), rgba(238,242,155,0.25), rgba(238,242,155,0))",
                }}
              />
              <span style={{ fontSize: 40 }}>🧠</span>
              <span style={{ fontSize: 32, fontWeight: 700, color: theme.accent }}>
                Memory detected
              </span>
              <span style={{ fontSize: 32, color: theme.muted }}>→</span>
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  opacity: savedProgress,
                }}
              >
                Saved to Club Memory
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: theme.accent,
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  fontWeight: 900,
                  transform: `scale(${savedProgress})`,
                }}
              >
                ✓
              </span>
            </div>
          </div>
          <Panel
            style={{
              flex: 1,
              padding: 40,
              minHeight: 640,
              opacity: memoryPanelIn,
              transform: `translateX(${(1 - memoryPanelIn) * 60}px)`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 32,
                paddingBottom: 24,
                borderBottom: "1px solid #2C2C2C",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: theme.accent,
                }}
              />
              <span style={{ fontSize: 32, fontWeight: 700 }}>Club Memory</span>
              <span style={{ marginLeft: "auto", fontSize: 24, color: theme.muted }}>
                {Math.round(
                  CHIPS.reduce(
                    (count, chip) => count + (frame >= chip.appearAt + 6 ? 1 : 0),
                    0,
                  ),
                )}{" "}
                saved
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {CHIPS.map((chip) => {
                const fly = spring({
                  frame: frame - chip.appearAt,
                  fps,
                  config: { damping: 15, stiffness: 110 },
                });
                return (
                  <div
                    key={chip.label}
                    style={{
                      backgroundColor: theme.panelLight,
                      borderRadius: 22,
                      padding: "22px 26px",
                      border: "1px solid #333",
                      opacity: Math.min(1, fly * 1.5),
                      transform: `translate(${(1 - fly) * -520}px, ${(1 - fly) * 240}px) scale(${0.6 + fly * 0.4})`,
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "6px 16px",
                        borderRadius: 999,
                        backgroundColor: "rgba(238, 242, 155, 0.14)",
                        color: theme.accent,
                        fontSize: 22,
                        fontWeight: 700,
                        marginBottom: 12,
                      }}
                    >
                      <span>{chip.icon}</span>
                      {chip.label}
                    </div>
                    <div style={{ fontSize: 27, lineHeight: 1.35, color: "#E8E8E8" }}>
                      {chip.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
