import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  ChatHeader,
  ChatMessage,
  Logo,
  Panel,
  Scene,
  TypingDots,
  fadeRange,
  useDelayedSpring,
} from "../components";
import { CHANNEL_ORDER, ChannelId, ChannelTile } from "../channels";
import { theme } from "../theme";

/** New member joins (26–32s) then asks for a sponsor pitch (32–48s). */
export const ASK_DURATION = 660;

const PANEL_WIDTH = 1100;
const PANEL_TOP = 64;
const PANEL_HEIGHT = 870;
const SOURCES_WIDTH = 650;

const JOIN_AT = 14;
const WELCOME_TYPING_AT = 38;
const WELCOME_AT = 66;
const QUESTION_TYPE_START = 140;
const QUESTION_TYPE_END = 200;
const QUESTION_AT = 206;
const ANSWER_TYPING_AT = 220;
const ANSWER_AT = 262;
const ANSWER_STAGGER = 15;
const CHIP_AT = 332;
const SHIFT_AT = 352;
const ROWS_AT = 374;
const ROW_STAGGER = 11;
const CAPTION_AT = 470;

const QUESTION = "I'm planning HuskyHacks 2026. Help me prepare a sponsor pitch.";

interface AnswerLine {
  icon: string;
  content: React.ReactNode;
}

const accent = (text: string): React.ReactNode => (
  <b style={{ color: theme.accent, fontWeight: 700 }}>{text}</b>
);

const ANSWER_LINES: AnswerLine[] = [
  {
    icon: "🤝",
    content: (
      <>
        {accent("Top sponsors:")} Google (Gold, 6–8 wks), Microsoft (8 wks)
      </>
    ),
  },
  {
    icon: "🎓",
    content: <>Ask {accent("Priya Nair '23")} for a Google intro</>,
  },
  {
    icon: "🏆",
    content: (
      <>
        {accent("2025 winning pitch:")} attendee demographics + project showcase
      </>
    ),
  },
  {
    icon: "⚠️",
    content: (
      <>
        {accent("Avoid:")} announcing before signed contracts, unverified walk-ins
      </>
    ),
  },
];

interface RetrievedMemory {
  channel: ChannelId;
  text: string;
  meta: string;
}

const MEMORIES: RetrievedMemory[] = [
  { channel: "slack", text: "Google said yes after Priya's ('23) intro", meta: "Slack · #sponsorship · Mar 2025" },
  { channel: "gmail", text: "Microsoft needs 8 weeks lead time", meta: "Gmail · Re: Microsoft sponsorship" },
  { channel: "slack", text: "Demographics deck won Google Gold", meta: "Slack · #sponsorship · Mar 2025" },
  { channel: "whatsapp", text: "HuskyHacks 2025 drew 287 people", meta: "WhatsApp · UW AI Club 🤖" },
  { channel: "discord", text: "Walk-ins without ID broke capacity", meta: "Discord · #events-planning" },
  { channel: "gmail", text: "Sponsor announced early — deal fell through", meta: "Gmail · Re: Sponsor contract" },
];

/** Grows its max-height so earlier chat rows scroll up smoothly. */
const Reveal: React.FC<{ at: number; height: number; children: React.ReactNode }> = ({
  at,
  height,
  children,
}) => {
  const progress = useDelayedSpring(at, 20, 110);
  return (
    <div
      style={{
        maxHeight: progress * height,
        overflow: "hidden",
        opacity: progress,
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
};

const EmptyState: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16,
      paddingBottom: 40,
    }}
  >
    <Logo size={110} />
    <span style={{ fontSize: 36, fontWeight: 800, marginTop: 8 }}>UW AI Club memory</span>
    <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: theme.muted }}>
      312 memories synced from
      {CHANNEL_ORDER.map((channel) => (
        <ChannelTile
          key={channel}
          channel={channel}
          size={40}
          style={{ boxShadow: "none", borderRadius: 11 }}
        />
      ))}
    </div>
  </div>
);

const JoinLine: React.FC = () => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <div
      style={{
        fontSize: 24,
        color: theme.muted,
        backgroundColor: "#222222",
        borderRadius: 20,
        padding: "8px 22px",
      }}
    >
      → <span style={{ color: theme.text, fontWeight: 700 }}>Rahul</span> joined UW AI Club
    </div>
  </div>
);

const InputBar: React.FC = () => {
  const frame = useCurrentFrame();
  const typedChars = Math.round(
    interpolate(frame, [QUESTION_TYPE_START, QUESTION_TYPE_END], [0, QUESTION.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const isTyping = frame >= QUESTION_TYPE_START && frame < QUESTION_AT;
  const caretVisible = Math.floor(frame / 8) % 2 === 0;
  const text = isTyping ? QUESTION.slice(0, typedChars) : "";
  return (
    <div
      style={{
        marginTop: 22,
        height: 72,
        borderRadius: 20,
        backgroundColor: "#242424",
        border: "1px solid #2E2E2E",
        display: "flex",
        alignItems: "center",
        padding: "0 26px",
        fontSize: 25,
        color: text ? theme.text : "#6A6A6A",
        whiteSpace: "nowrap",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {text || "Ask the club anything…"}
      {isTyping && caretVisible ? (
        <span style={{ color: theme.accent, marginLeft: 2 }}>|</span>
      ) : null}
    </div>
  );
};

const MemoriesChip: React.FC = () => {
  const frame = useCurrentFrame();
  const chipIn = useDelayedSpring(CHIP_AT, 11, 170);
  const glow = fadeRange(frame, SHIFT_AT, SHIFT_AT + 20);
  return (
    <div
      style={{
        marginTop: 16,
        alignSelf: "flex-start",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "10px 20px",
        borderRadius: 26,
        border: `1.5px solid ${theme.accent}`,
        backgroundColor: `rgba(238, 242, 155, ${0.06 + glow * 0.1})`,
        boxShadow: `0 0 ${glow * 30}px rgba(238, 242, 155, 0.35)`,
        color: theme.accent,
        fontSize: 24,
        fontWeight: 700,
        opacity: chipIn,
        transform: `scale(${0.6 + chipIn * 0.4})`,
        transformOrigin: "left center",
        whiteSpace: "nowrap",
      }}
    >
      🧠 6 memories retrieved
      <div style={{ display: "flex", gap: 6 }}>
        {CHANNEL_ORDER.map((channel) => (
          <ChannelTile
            key={channel}
            channel={channel}
            size={30}
            style={{ boxShadow: "none", borderRadius: 8 }}
          />
        ))}
      </div>
      <span style={{ fontSize: 20, opacity: 0.8 }}>{glow > 0.5 ? "▾" : "▸"}</span>
    </div>
  );
};

const AnswerBody: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < ANSWER_AT) {
    return <TypingDots />;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 27 }}>
      <span style={{ color: theme.text }}>Here's your sponsor-pitch playbook:</span>
      {ANSWER_LINES.map((line, index) => {
        const appearAt = ANSWER_AT + 8 + index * ANSWER_STAGGER;
        const lineIn = fadeRange(frame, appearAt, appearAt + 12);
        return (
          <div
            key={line.icon}
            style={{
              display: "flex",
              gap: 14,
              lineHeight: 1.35,
              maxHeight: lineIn * 80,
              overflow: "hidden",
              opacity: lineIn,
              transform: `translateX(${(1 - lineIn) * 20}px)`,
            }}
          >
            <span style={{ flexShrink: 0 }}>{line.icon}</span>
            <span>{line.content}</span>
          </div>
        );
      })}
      {frame >= CHIP_AT ? <MemoriesChip /> : null}
    </div>
  );
};

const MemoryRow: React.FC<{ memory: RetrievedMemory; index: number }> = ({ memory, index }) => {
  const rowIn = useDelayedSpring(ROWS_AT + index * ROW_STAGGER, 16, 140);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "18px 20px",
        borderRadius: 18,
        backgroundColor: "#202020",
        opacity: rowIn,
        transform: `translateX(${(1 - rowIn) * 50}px)`,
      }}
    >
      <ChannelTile channel={memory.channel} size={54} style={{ boxShadow: "none", borderRadius: 14 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
        <span style={{ fontSize: 23, color: "#F0F0F0", fontWeight: 600, lineHeight: 1.25 }}>
          {memory.text}
        </span>
        <span style={{ fontSize: 18, color: theme.muted }}>{memory.meta}</span>
      </div>
    </div>
  );
};

export const Ask: React.FC = () => {
  const frame = useCurrentFrame();
  const panelIn = useDelayedSpring(0, 18, 110);
  const shift = useDelayedSpring(SHIFT_AT, 20, 90);
  const captionIn = useDelayedSpring(CAPTION_AT, 18, 110);
  const centeredLeft = (1920 - PANEL_WIDTH) / 2;
  const shiftedLeft = (1920 - PANEL_WIDTH - SOURCES_WIDTH - 40) / 2;
  const panelLeft = interpolate(shift, [0, 1], [centeredLeft, shiftedLeft]);
  const sourcesLeft = shiftedLeft + PANEL_WIDTH + 40;

  return (
    <Scene duration={ASK_DURATION}>
      <Panel
        style={{
          position: "absolute",
          left: panelLeft,
          top: PANEL_TOP,
          width: PANEL_WIDTH,
          height: PANEL_HEIGHT,
          padding: "36px 46px 36px",
          display: "flex",
          flexDirection: "column",
          opacity: panelIn,
          transform: `translateY(${(1 - panelIn) * 50}px)`,
        }}
      >
        <ChatHeader channel="ClubBrain" subtitle="UW AI Club · #ask-the-club" />
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 30,
            maskImage: "linear-gradient(to bottom, transparent 0px, black 70px)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, black 70px)",
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <EmptyState />
          </div>
          <Reveal at={JOIN_AT} height={60}>
            <JoinLine />
          </Reveal>
          {frame >= WELCOME_TYPING_AT ? (
            <Reveal at={WELCOME_TYPING_AT} height={170}>
              <ChatMessage name="ClubBrain" initials="CB" color={theme.accent} appearAt={WELCOME_TYPING_AT} isBot time="just now">
                {frame < WELCOME_AT ? (
                  <TypingDots />
                ) : (
                  <span style={{ opacity: fadeRange(frame, WELCOME_AT, WELCOME_AT + 10) }}>
                    Welcome, Rahul! 👋 I'm the club's memory — ask me anything.
                  </span>
                )}
              </ChatMessage>
            </Reveal>
          ) : null}
          {frame >= QUESTION_AT ? (
            <Reveal at={QUESTION_AT} height={170}>
              <ChatMessage name="Rahul" initials="RA" color="#7DD3FC" appearAt={QUESTION_AT} time="just now">
                {QUESTION}
              </ChatMessage>
            </Reveal>
          ) : null}
          {frame >= ANSWER_TYPING_AT ? (
            <Reveal at={ANSWER_TYPING_AT} height={620}>
              <ChatMessage name="ClubBrain" initials="CB" color={theme.accent} appearAt={ANSWER_TYPING_AT} isBot time="just now">
                <AnswerBody />
              </ChatMessage>
            </Reveal>
          ) : null}
        </div>
        <InputBar />
      </Panel>
      <Panel
        style={{
          position: "absolute",
          left: sourcesLeft,
          top: PANEL_TOP,
          width: SOURCES_WIDTH,
          height: PANEL_HEIGHT,
          padding: "36px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          opacity: shift,
          transform: `translateX(${(1 - shift) * 260}px)`,
          border: `1.5px solid rgba(238, 242, 155, 0.35)`,
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 800, color: theme.accent }}>
          🧠 6 memories retrieved
        </div>
        <div style={{ fontSize: 21, color: theme.muted, marginBottom: 8 }}>
          from 4 channels · past 3 exec boards
        </div>
        {MEMORIES.map((memory, index) => (
          <MemoryRow key={memory.text} memory={memory} index={index} />
        ))}
      </Panel>
      <div
        style={{
          position: "absolute",
          top: PANEL_TOP + PANEL_HEIGHT + 30,
          width: "100%",
          textAlign: "center",
          fontSize: 38,
          fontWeight: 700,
          letterSpacing: -0.5,
          opacity: captionIn,
          transform: `translateY(${(1 - captionIn) * 20}px)`,
        }}
      >
        One answer — pulled from <span style={{ color: theme.accent }}>every channel</span>.
      </div>
    </Scene>
  );
};
