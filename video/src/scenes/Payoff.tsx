import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  ChatHeader,
  ChatMessage,
  KineticText,
  Panel,
  Scene,
  TypingDots,
  fadeRange,
  useDelayedSpring,
} from "../components";
import { theme } from "../theme";

export const PAYOFF_DURATION = 390;

interface AnswerLine {
  icon: string;
  text: React.ReactNode;
  appearAt: number;
}

const ANSWER_START = 96;

const ANSWER_LINES: AnswerLine[] = [
  {
    icon: "🤝",
    text: (
      <>
        Start Google outreach <b style={{ color: theme.accent }}>6–8 weeks early</b> — Alex owns the relationship.
      </>
    ),
    appearAt: ANSWER_START,
  },
  {
    icon: "⚠️",
    text: (
      <>
        Avoid <b style={{ color: theme.accent }}>Memorial Union</b> for 150+ people.
      </>
    ),
    appearAt: ANSWER_START + 14,
  },
  {
    icon: "💡",
    text: <>Announce sponsors only after contracts are signed.</>,
    appearAt: ANSWER_START + 28,
  },
];

interface SourceMemory {
  author: string;
  date: string;
  text: string;
}

const SOURCES: SourceMemory[] = [
  { author: "Alex", date: "Mar 2025", text: "Reached out to Google ~7 weeks before the event." },
  { author: "Maya", date: "Mar 2025", text: "Memorial Union doesn't work for 150+ people." },
  { author: "Jordan", date: "Apr 2025", text: "Announced a sponsor too early — contract fell through." },
];

const CHIP_AT = 160;
const EXPAND_AT = 185;
const OUTRO_AT = 285;

export const Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const panelIn = useDelayedSpring(0, 18, 110);
  const chipIn = useDelayedSpring(CHIP_AT, 11, 160);
  const expand = useDelayedSpring(EXPAND_AT, 18, 100);
  const typingVisible = frame >= 40 && frame < ANSWER_START;
  const outro = fadeRange(frame, OUTRO_AT, OUTRO_AT + 22);

  return (
    <Scene duration={PAYOFF_DURATION}>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity: 1 - outro * 0.85,
          filter: `blur(${outro * 8}px)`,
          transform: `scale(${1 - outro * 0.05})`,
        }}
      >
        <Panel
          style={{
            width: 1440,
            padding: "40px 50px",
            opacity: panelIn,
            transform: `translateY(${(1 - panelIn) * 50}px)`,
          }}
        >
          <ChatHeader channel="# exec-board" subtitle="ACM Student Chapter · 2026" />
          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            <ChatMessage
              name="Sarah"
              initials="SA"
              color="#7DD3FC"
              appearAt={8}
              time="Sep 3, 2026"
            >
              I'm organizing this year's hackathon. How do we get sponsors?{" "}
              <span style={{ color: theme.accent, fontWeight: 600 }}>@ClubBrain</span>
            </ChatMessage>
            {frame >= 40 ? (
              <ChatMessage
                name="ClubBrain"
                initials="CB"
                color={theme.accent}
                appearAt={40}
                isBot
                time="just now"
              >
                {typingVisible ? (
                  <TypingDots />
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {ANSWER_LINES.map((line) => {
                      const lineIn = fadeRange(frame, line.appearAt, line.appearAt + 12);
                      return (
                        <div
                          key={line.icon}
                          style={{
                            display: "flex",
                            gap: 16,
                            opacity: lineIn,
                            transform: `translateX(${(1 - lineIn) * 20}px)`,
                          }}
                        >
                          <span>{line.icon}</span>
                          <span>{line.text}</span>
                        </div>
                      );
                    })}
                    <div
                      style={{
                        marginTop: 14,
                        alignSelf: "flex-start",
                        borderRadius: 22,
                        border: `1.5px solid ${theme.accent}`,
                        backgroundColor: "rgba(238, 242, 155, 0.07)",
                        opacity: chipIn,
                        transform: `scale(${0.6 + chipIn * 0.4})`,
                        transformOrigin: "left center",
                        overflow: "hidden",
                        width: interpolate(expand, [0, 1], [360, 1180]),
                      }}
                    >
                      <div
                        style={{
                          padding: "10px 22px",
                          fontSize: 24,
                          fontWeight: 700,
                          color: theme.accent,
                          display: "flex",
                          gap: 10,
                          alignItems: "center",
                          whiteSpace: "nowrap",
                        }}
                      >
                        🧠 3 memories retrieved
                        <span style={{ color: theme.muted, fontWeight: 500, opacity: expand }}>
                          · from past exec boards
                        </span>
                      </div>
                      <div
                        style={{
                          height: expand * 200,
                          padding: "0 22px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                        }}
                      >
                        {SOURCES.map((source, index) => {
                          const rowIn = fadeRange(
                            frame,
                            EXPAND_AT + 8 + index * 8,
                            EXPAND_AT + 20 + index * 8,
                          );
                          return (
                            <div
                              key={source.author}
                              style={{
                                display: "flex",
                                gap: 16,
                                fontSize: 23,
                                padding: "10px 16px",
                                borderRadius: 14,
                                backgroundColor: "#202020",
                                opacity: rowIn,
                                whiteSpace: "nowrap",
                              }}
                            >
                              <span style={{ color: theme.text, fontWeight: 700, width: 90 }}>
                                {source.author}
                              </span>
                              <span style={{ color: theme.muted, width: 120 }}>{source.date}</span>
                              <span style={{ color: "#CFCFCF" }}>“{source.text}”</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </ChatMessage>
            ) : null}
          </div>
        </Panel>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          opacity: outro,
        }}
      >
        <KineticText text="She never lived it." delay={OUTRO_AT + 6} fontSize={110} />
        <KineticText
          text="The organization did."
          delay={OUTRO_AT + 36}
          fontSize={110}
          highlight={["organization"]}
        />
      </AbsoluteFill>
    </Scene>
  );
};
