import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { KineticText, Scene, fadeRange, useDelayedSpring } from "../components";
import { DiscordMockup, GmailMockup, SlackMockup, WhatsAppMockup } from "../channels";

export const SCATTERED_DURATION = 360;

interface ScatteredCard {
  key: string;
  Mockup: React.FC;
  left: number;
  top: number;
  rotation: number;
  enterFrom: { x: number; y: number };
  appearAt: number;
}

const CARDS: ScatteredCard[] = [
  {
    key: "whatsapp",
    Mockup: WhatsAppMockup,
    left: 80,
    top: 56,
    rotation: -5,
    enterFrom: { x: -900, y: -200 },
    appearAt: 8,
  },
  {
    key: "discord",
    Mockup: DiscordMockup,
    left: 1110,
    top: 40,
    rotation: 4,
    enterFrom: { x: 900, y: -250 },
    appearAt: 28,
  },
  {
    key: "slack",
    Mockup: SlackMockup,
    left: 110,
    top: 610,
    rotation: 3,
    enterFrom: { x: -900, y: 300 },
    appearAt: 48,
  },
  {
    key: "gmail",
    Mockup: GmailMockup,
    left: 1110,
    top: 650,
    rotation: -3.5,
    enterFrom: { x: 900, y: 300 },
    appearAt: 68,
  },
];

const BADGE_AT = 104;
const CAPTION_AT = 150;
const BURIED_AT = 236;

const UnreadBadge: React.FC<{ appearAt: number; count: string }> = ({ appearAt, count }) => {
  const pop = useDelayedSpring(appearAt, 9, 200);
  return (
    <div
      style={{
        position: "absolute",
        top: -18,
        right: -18,
        minWidth: 56,
        height: 56,
        padding: "0 14px",
        borderRadius: 28,
        backgroundColor: "#F23F43",
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: 800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${pop})`,
        boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
      }}
    >
      {count}
    </div>
  );
};

const BADGE_COUNTS = ["128", "99+", "47", "312"];

const FloatingCard: React.FC<{ card: ScatteredCard; index: number }> = ({ card, index }) => {
  const frame = useCurrentFrame();
  const enter = useDelayedSpring(card.appearAt, 16, 90);
  const bob = Math.sin(frame / 38 + index * 1.7) * 8;
  const sway = Math.sin(frame / 52 + index) * 0.7;
  const buried = fadeRange(frame, BURIED_AT, BURIED_AT + 40);
  const sink = buried * (index < 2 ? -40 : 40);
  const { Mockup } = card;
  return (
    <div
      style={{
        position: "absolute",
        left: card.left,
        top: card.top,
        opacity: enter,
        transform: `translate(${(1 - enter) * card.enterFrom.x}px, ${
          (1 - enter) * card.enterFrom.y + bob + sink
        }px) rotate(${card.rotation * (1 + (1 - enter) * 3) + sway}deg) scale(${
          0.92 - buried * 0.08
        })`,
        transformOrigin: "center center",
      }}
    >
      <div style={{ position: "relative" }}>
        <Mockup />
        <UnreadBadge appearAt={BADGE_AT + index * 7} count={BADGE_COUNTS[index]} />
      </div>
    </div>
  );
};

export const Scattered: React.FC = () => {
  const frame = useCurrentFrame();
  const dim = fadeRange(frame, CAPTION_AT - 6, CAPTION_AT + 16);
  const buried = fadeRange(frame, BURIED_AT, BURIED_AT + 40);

  return (
    <Scene duration={SCATTERED_DURATION}>
      <AbsoluteFill
        style={{
          opacity: 1 - dim * 0.45 - buried * 0.35,
          filter: `blur(${dim * 2 + buried * 7}px)`,
        }}
      >
        {CARDS.map((card, index) => (
          <FloatingCard key={card.key} card={card} index={index} />
        ))}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 62% 30% at 50% 50%, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0) 100%)",
          opacity: dim,
        }}
      />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 18 }}>
        <KineticText
          text="Your club's knowledge is scattered everywhere."
          delay={CAPTION_AT}
          fontSize={70}
          highlight={["scattered"]}
          stagger={4}
        />
        <KineticText
          text="…and buried."
          delay={BURIED_AT + 6}
          fontSize={70}
          color="#8A8A8A"
          stagger={6}
        />
      </AbsoluteFill>
    </Scene>
  );
};
