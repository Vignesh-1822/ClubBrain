import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { KineticText, Scene } from "../components";
import { theme } from "../theme";

export const ROADMAP_DURATION = 150;

interface Channel {
  name: string;
  glyph: string;
  tint: string;
  live: boolean;
}

const CHANNELS: Channel[] = [
  { name: "Club chat", glyph: "💬", tint: theme.accent, live: true },
  { name: "WhatsApp", glyph: "📱", tint: "#25D366", live: false },
  { name: "Discord", glyph: "🎮", tint: "#5865F2", live: false },
  { name: "Slack", glyph: "#", tint: "#E01E5A", live: false },
  { name: "Gmail", glyph: "✉️", tint: "#EA4335", live: false },
];

export const Roadmap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Scene duration={ROADMAP_DURATION}>
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "center", gap: 90 }}
      >
        <KineticText
          text="Every channel your club already uses."
          delay={4}
          fontSize={84}
          highlight={["channel"]}
          stagger={4}
        />
        <div style={{ display: "flex", gap: 36 }}>
          {CHANNELS.map((channel, index) => {
            const pop = spring({
              frame: frame - 30 - index * 7,
              fps,
              config: { damping: 12, stiffness: 140 },
            });
            return (
              <div
                key={channel.name}
                style={{
                  width: 270,
                  height: 300,
                  borderRadius: theme.radius,
                  backgroundColor: theme.panel,
                  border: channel.live ? `2px solid ${theme.accent}` : "1px solid #2A2A2A",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 22,
                  opacity: pop,
                  transform: `translateY(${(1 - pop) * 80}px) scale(${0.7 + pop * 0.3})`,
                }}
              >
                <div
                  style={{
                    width: 104,
                    height: 104,
                    borderRadius: 28,
                    backgroundColor: channel.live ? theme.accent : `${channel.tint}33`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 52,
                    fontWeight: 900,
                    color: channel.tint,
                  }}
                >
                  {channel.glyph}
                </div>
                <span style={{ fontSize: 32, fontWeight: 700 }}>{channel.name}</span>
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    padding: "6px 16px",
                    borderRadius: 999,
                    backgroundColor: channel.live ? theme.accent : "#262626",
                    color: channel.live ? "#000" : theme.muted,
                  }}
                >
                  {channel.live ? "✓ Live" : "Coming soon"}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
