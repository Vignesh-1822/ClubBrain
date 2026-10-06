import React from "react";
import { siDiscord, siGmail, siWhatsapp } from "simple-icons";
import { theme } from "./theme";

export type ChannelId = "whatsapp" | "discord" | "slack" | "gmail";

export const CHANNEL_COLORS: Record<ChannelId, string> = {
  whatsapp: `#${siWhatsapp.hex}`,
  discord: `#${siDiscord.hex}`,
  slack: "#4A154B",
  gmail: `#${siGmail.hex}`,
};

export const CHANNEL_NAMES: Record<ChannelId, string> = {
  whatsapp: "WhatsApp",
  discord: "Discord",
  slack: "Slack",
  gmail: "Gmail",
};

export const CHANNEL_ORDER: ChannelId[] = ["whatsapp", "discord", "slack", "gmail"];

const SIMPLE_ICON_PATHS: Record<Exclude<ChannelId, "slack">, string> = {
  whatsapp: siWhatsapp.path,
  discord: siDiscord.path,
  gmail: siGmail.path,
};

/** Official multicolor Slack mark (simple-icons no longer ships Slack). */
const SlackMark: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 2447.6 2452.5">
    <g clipRule="evenodd" fillRule="evenodd">
      <path
        d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z"
        fill="#36c5f0"
      />
      <path
        d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z"
        fill="#2eb67d"
      />
      <path
        d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z"
        fill="#ecb22e"
      />
      <path
        d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0"
        fill="#e01e5a"
      />
    </g>
  </svg>
);

interface ChannelIconProps {
  channel: ChannelId;
  size: number;
  color?: string;
}

/** Bare brand glyph. Slack always renders multicolor. */
export const ChannelIcon: React.FC<ChannelIconProps> = ({ channel, size, color }) => {
  if (channel === "slack") {
    return <SlackMark size={size} />;
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d={SIMPLE_ICON_PATHS[channel]} fill={color ?? CHANNEL_COLORS[channel]} />
    </svg>
  );
};

const TILE_STYLES: Record<ChannelId, { background: string; glyph?: string }> = {
  whatsapp: { background: CHANNEL_COLORS.whatsapp, glyph: "#FFFFFF" },
  discord: { background: CHANNEL_COLORS.discord, glyph: "#FFFFFF" },
  slack: { background: "#FFFFFF" },
  gmail: { background: "#FFFFFF" },
};

interface ChannelTileProps {
  channel: ChannelId;
  size: number;
  style?: React.CSSProperties;
}

/** App-icon style rounded tile with the brand glyph. */
export const ChannelTile: React.FC<ChannelTileProps> = ({ channel, size, style }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.26,
      backgroundColor: TILE_STYLES[channel].background,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
      ...style,
    }}
  >
    <ChannelIcon channel={channel} size={size * 0.6} color={TILE_STYLES[channel].glyph} />
  </div>
);

/* ------------------------------------------------------------------ */
/* App mockups                                                         */
/* ------------------------------------------------------------------ */

const mockupFrame: React.CSSProperties = {
  borderRadius: 22,
  overflow: "hidden",
  boxShadow: "0 30px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.08)",
  fontFamily: theme.font,
};

const Initials: React.FC<{ text: string; color: string; size: number; radius?: number }> = ({
  text,
  color,
  size,
  radius,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius ?? size / 2,
      backgroundColor: color,
      color: "#FFFFFF",
      fontWeight: 700,
      fontSize: size * 0.4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    {text}
  </div>
);

export const WhatsAppMockup: React.FC<{ width?: number }> = ({ width = 700 }) => (
  <div style={{ ...mockupFrame, width }}>
    <div
      style={{
        backgroundColor: "#008069",
        height: 96,
        padding: "0 26px",
        display: "flex",
        alignItems: "center",
        gap: 18,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: "#DFE5E7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 30,
        }}
      >
        🤖
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 600 }}>UW AI Club 🤖</span>
        <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 18 }}>
          Jordan, Maya, Alex, You +24
        </span>
      </div>
      <ChannelIcon channel="whatsapp" size={40} color="#FFFFFF" />
    </div>
    <div
      style={{
        backgroundColor: "#EFEAE2",
        padding: "24px 26px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          alignSelf: "flex-start",
          maxWidth: 560,
          backgroundColor: "#FFFFFF",
          borderRadius: "4px 16px 16px 16px",
          padding: "12px 18px 10px",
          boxShadow: "0 1px 1px rgba(0,0,0,0.12)",
        }}
      >
        <div style={{ color: "#D3396D", fontSize: 19, fontWeight: 700, marginBottom: 4 }}>
          Jordan Lee
        </div>
        <div style={{ color: "#111B21", fontSize: 25, lineHeight: 1.35 }}>
          HuskyHacks had 287 people — Memorial Union entry was chaos 😩
        </div>
        <div style={{ color: "#667781", fontSize: 15, textAlign: "right", marginTop: 4 }}>
          9:41 PM
        </div>
      </div>
      <div
        style={{
          alignSelf: "flex-end",
          backgroundColor: "#D9FDD3",
          borderRadius: "16px 4px 16px 16px",
          padding: "12px 18px 10px",
          boxShadow: "0 1px 1px rgba(0,0,0,0.12)",
          display: "flex",
          alignItems: "flex-end",
          gap: 12,
        }}
      >
        <span style={{ color: "#111B21", fontSize: 25 }}>never booking MU for 150+ again</span>
        <span style={{ color: "#667781", fontSize: 15, whiteSpace: "nowrap" }}>
          9:43 PM <span style={{ color: "#53BDEB", fontWeight: 700 }}>✓✓</span>
        </span>
      </div>
    </div>
  </div>
);

interface DiscordMessageProps {
  name: string;
  nameColor: string;
  avatarColor: string;
  initials: string;
  time: string;
  text: string;
}

const DiscordMessage: React.FC<DiscordMessageProps> = ({
  name,
  nameColor,
  avatarColor,
  initials,
  time,
  text,
}) => (
  <div style={{ display: "flex", gap: 16 }}>
    <Initials text={initials} color={avatarColor} size={50} />
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
        <span style={{ color: nameColor, fontSize: 22, fontWeight: 600 }}>{name}</span>
        <span style={{ color: "#949BA4", fontSize: 15 }}>{time}</span>
      </div>
      <span style={{ color: "#DBDEE1", fontSize: 24, lineHeight: 1.35 }}>{text}</span>
    </div>
  </div>
);

export const DiscordMockup: React.FC<{ width?: number }> = ({ width = 720 }) => (
  <div style={{ ...mockupFrame, width, display: "flex", backgroundColor: "#313338" }}>
    <div
      style={{
        width: 78,
        backgroundColor: "#1E1F22",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        paddingTop: 16,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 16,
          backgroundColor: CHANNEL_COLORS.discord,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ChannelIcon channel="discord" size={30} color="#FFFFFF" />
      </div>
      <div style={{ width: 32, height: 2, backgroundColor: "#35363C" }} />
      <Initials text="AI" color="#23A559" size={52} radius={16} />
      <Initials text="UW" color="#4E5058" size={52} />
    </div>
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          height: 70,
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: "2px solid #1F2023",
        }}
      >
        <span style={{ color: "#80848E", fontSize: 32, fontWeight: 500 }}>#</span>
        <span style={{ color: "#F2F3F5", fontSize: 24, fontWeight: 700 }}>events-planning</span>
      </div>
      <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 22 }}>
        <DiscordMessage
          name="arjun"
          nameColor="#F0B232"
          avatarColor="#F47B67"
          initials="AR"
          time="Today at 4:12 PM"
          text="Spice Kitchen showed up 90 min late again 🙃"
        />
        <DiscordMessage
          name="leah.m"
          nameColor="#EB459E"
          avatarColor="#5865F2"
          initials="LM"
          time="Today at 4:14 PM"
          text="walk-ins without student ID pushed us over capacity"
        />
        <div
          style={{
            backgroundColor: "#383A40",
            borderRadius: 10,
            padding: "14px 18px",
            color: "#6D6F78",
            fontSize: 19,
          }}
        >
          Message #events-planning
        </div>
      </div>
    </div>
  </div>
);

export const SlackMockup: React.FC<{ width?: number }> = ({ width = 760 }) => (
  <div style={{ ...mockupFrame, width, display: "flex", backgroundColor: "#FFFFFF" }}>
    <div
      style={{
        width: 196,
        backgroundColor: "#3F0E40",
        padding: "20px 0",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <span style={{ color: "#FFFFFF", fontSize: 21, fontWeight: 800, padding: "0 18px 12px" }}>
        UW AI Club
      </span>
      {["general", "sponsorship", "events", "exec-board"].map((channel) => {
        const isActive = channel === "sponsorship";
        return (
          <span
            key={channel}
            style={{
              fontSize: 18,
              padding: "5px 18px",
              color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.7)",
              backgroundColor: isActive ? "#1164A3" : "transparent",
              fontWeight: isActive ? 700 : 400,
            }}
          >
            # {channel}
          </span>
        );
      })}
    </div>
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          height: 66,
          padding: "0 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #E2E2E2",
        }}
      >
        <span style={{ color: "#1D1C1D", fontSize: 23, fontWeight: 800 }}># sponsorship</span>
        <ChannelIcon channel="slack" size={30} />
      </div>
      <div style={{ padding: "20px 22px", display: "flex", gap: 14 }}>
        <Initials text="DK" color="#E8912D" size={48} radius={10} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
            <span style={{ color: "#1D1C1D", fontSize: 21, fontWeight: 800 }}>Dana Kim</span>
            <span style={{ color: "#616061", fontSize: 15 }}>2:14 PM</span>
          </div>
          <span style={{ color: "#1D1C1D", fontSize: 23, lineHeight: 1.4 }}>
            Google said yes after Priya's ('23) intro — pitch deck with attendee demographics won
            it 🎉
          </span>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            {["🙌 12", "🔥 8"].map((reaction) => (
              <span
                key={reaction}
                style={{
                  fontSize: 16,
                  padding: "3px 10px",
                  borderRadius: 14,
                  backgroundColor: "#EAF4FB",
                  border: "1px solid #1D9BD1",
                  color: "#1264A3",
                  fontWeight: 600,
                }}
              >
                {reaction}
              </span>
            ))}
          </div>
          <span style={{ color: "#1264A3", fontSize: 17, fontWeight: 700 }}>3 replies</span>
        </div>
      </div>
    </div>
  </div>
);

export const GmailMockup: React.FC<{ width?: number }> = ({ width = 720 }) => (
  <div style={{ ...mockupFrame, width, backgroundColor: "#FFFFFF" }}>
    <div
      style={{
        height: 74,
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        backgroundColor: "#F6F8FC",
      }}
    >
      <ChannelIcon channel="gmail" size={34} />
      <span style={{ color: "#5F6368", fontSize: 24 }}>Gmail</span>
      <div
        style={{
          flex: 1,
          marginLeft: 18,
          height: 44,
          borderRadius: 22,
          backgroundColor: "#E9EEF6",
          color: "#5F6368",
          fontSize: 17,
          display: "flex",
          alignItems: "center",
          paddingLeft: 20,
        }}
      >
        Search mail
      </div>
    </div>
    <div style={{ padding: "22px 28px 26px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ color: "#1F1F1F", fontSize: 28 }}>Re: Microsoft sponsorship</span>
        <span
          style={{
            fontSize: 14,
            padding: "2px 8px",
            borderRadius: 4,
            backgroundColor: "#DDE3EA",
            color: "#444746",
          }}
        >
          Inbox
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Initials text="E" color="#7B1FA2" size={46} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#1F1F1F", fontSize: 20, fontWeight: 700 }}>Elena Torres</span>
          <span style={{ color: "#5F6368", fontSize: 16 }}>Microsoft University Programs</span>
        </div>
        <span style={{ color: "#5F6368", fontSize: 16 }}>Feb 12</span>
      </div>
      <span style={{ color: "#1F1F1F", fontSize: 23, lineHeight: 1.45 }}>
        Hi team — thanks for reaching out! Heads-up: sponsorship requests need{" "}
        <b>8 weeks lead time</b>, so please send the deck by…
      </span>
    </div>
  </div>
);
