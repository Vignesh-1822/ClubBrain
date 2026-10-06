import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "./theme";

/** Spring that starts at `delay` frames. */
export const useDelayedSpring = (
  delay: number,
  damping = 14,
  stiffness = 120,
): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, stiffness } });
};

export const fadeRange = (
  frame: number,
  start: number,
  end: number,
  from = 0,
  to = 1,
): number =>
  interpolate(frame, [start, end], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

interface SceneProps {
  duration: number;
  children: React.ReactNode;
  fadeIn?: number;
  fadeOut?: number;
}

/** Full-frame black scene that fades in and out at its edges. */
export const Scene: React.FC<SceneProps> = ({
  duration,
  children,
  fadeIn = 10,
  fadeOut = 12,
}) => {
  const frame = useCurrentFrame();
  const opacity = Math.min(
    fadeIn > 0 ? fadeRange(frame, 0, fadeIn) : 1,
    fadeOut > 0 ? fadeRange(frame, duration - fadeOut, duration, 1, 0) : 1,
  );
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        fontFamily: theme.font,
        color: theme.text,
        opacity,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

interface KineticTextProps {
  text: string;
  delay: number;
  fontSize: number;
  color?: string;
  highlight?: string[];
  stagger?: number;
  weight?: number;
}

/** Words spring up one by one. */
export const KineticText: React.FC<KineticTextProps> = ({
  text,
  delay,
  fontSize,
  color = theme.text,
  highlight = [],
  stagger = 4,
  weight = 800,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        columnGap: fontSize * 0.28,
        fontSize,
        fontWeight: weight,
        letterSpacing: -fontSize * 0.035,
        lineHeight: 1.1,
      }}
    >
      {words.map((word, index) => {
        const progress = spring({
          frame: frame - delay - index * stagger,
          fps,
          config: { damping: 15, stiffness: 140 },
        });
        const isHighlighted = highlight.includes(word.replace(/[.,!?…]/g, ""));
        return (
          <span
            key={`${word}-${index}`}
            style={{
              display: "inline-block",
              opacity: progress,
              transform: `translateY(${(1 - progress) * fontSize * 0.6}px)`,
              filter: `blur(${(1 - progress) * 8}px)`,
              color: isHighlighted ? theme.accent : color,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

interface AvatarProps {
  initials: string;
  color: string;
  size?: number;
  textColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  initials,
  color,
  size = 56,
  textColor = "#000",
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
      color: textColor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      fontSize: size * 0.4,
      flexShrink: 0,
    }}
  >
    {initials}
  </div>
);

interface BrainIconProps {
  size: number;
  color?: string;
  drawProgress?: number;
}

const BRAIN_PATHS: string[] = [
  "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
  "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
  "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4",
  "M17.599 6.5a3 3 0 0 0 .399-1.375",
  "M6.003 5.125A3 3 0 0 0 6.401 6.5",
  "M3.477 10.896a4 4 0 0 1 .585-.396",
  "M19.938 10.5a4 4 0 0 1 .585.396",
  "M6 18a4 4 0 0 1-1.967-.516",
  "M19.967 17.484A4 4 0 0 1 18 18",
];

export const BrainIcon: React.FC<BrainIconProps> = ({
  size,
  color = "#000",
  drawProgress = 1,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {BRAIN_PATHS.map((path) => (
      <path
        key={path}
        d={path}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - drawProgress}
      />
    ))}
  </svg>
);

interface LogoProps {
  size: number;
  drawProgress?: number;
  glow?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size, drawProgress = 1, glow = true }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: theme.accent,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: glow ? `0 0 ${size * 0.6}px rgba(238, 242, 155, 0.25)` : "none",
      flexShrink: 0,
    }}
  >
    <BrainIcon size={size * 0.58} drawProgress={drawProgress} />
  </div>
);

interface PanelProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Panel: React.FC<PanelProps> = ({ children, style }) => (
  <div
    style={{
      backgroundColor: theme.panel,
      borderRadius: theme.radius,
      border: "1px solid #2A2A2A",
      ...style,
    }}
  >
    {children}
  </div>
);

interface ChatMessageProps {
  name: string;
  initials: string;
  color: string;
  children: React.ReactNode;
  appearAt: number;
  isBot?: boolean;
  time?: string;
}

/** Chat row with avatar, name, and message body; springs in at `appearAt`. */
export const ChatMessage: React.FC<ChatMessageProps> = ({
  name,
  initials,
  color,
  children,
  appearAt,
  isBot = false,
  time = "",
}) => {
  const progress = useDelayedSpring(appearAt, 16, 140);
  return (
    <div
      style={{
        display: "flex",
        gap: 22,
        alignItems: "flex-start",
        opacity: progress,
        transform: `translateY(${(1 - progress) * 30}px)`,
      }}
    >
      {isBot ? (
        <Logo size={60} glow={false} />
      ) : (
        <Avatar initials={initials} color={color} size={60} />
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: 26,
              color: isBot ? theme.accent : theme.text,
            }}
          >
            {name}
          </span>
          <span style={{ fontSize: 20, color: theme.muted }}>{time}</span>
        </div>
        <div style={{ fontSize: 30, lineHeight: 1.4, color: "#E8E8E8" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export const TypingDots: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 10, padding: "14px 0" }}>
      {[0, 1, 2].map((index) => {
        const bounce = Math.sin((frame - index * 5) / 4);
        return (
          <div
            key={index}
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: theme.accent,
              opacity: 0.4 + 0.6 * Math.max(0, bounce),
              transform: `translateY(${-Math.max(0, bounce) * 8}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

export const ChatHeader: React.FC<{ channel: string; subtitle: string }> = ({
  channel,
  subtitle,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 26,
      marginBottom: 34,
      borderBottom: "1px solid #2C2C2C",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <span style={{ fontSize: 30, fontWeight: 700 }}>{channel}</span>
      <span style={{ fontSize: 22, color: theme.muted }}>{subtitle}</span>
    </div>
    <div style={{ display: "flex", gap: 8 }}>
      {["#3A3A3A", "#3A3A3A", "#3A3A3A"].map((dotColor, index) => (
        <div
          key={index}
          style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: dotColor }}
        />
      ))}
    </div>
  </div>
);
