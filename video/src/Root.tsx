import React from "react";
import { AbsoluteFill, Composition, Sequence } from "remotion";
import { FPS, theme } from "./theme";
import { Hook, HOOK_DURATION } from "./scenes/Hook";
import { Scattered, SCATTERED_DURATION } from "./scenes/Scattered";
import { Gather, GATHER_DURATION } from "./scenes/Gather";
import { Ask, ASK_DURATION } from "./scenes/Ask";
import { Punchline, PUNCHLINE_DURATION } from "./scenes/Punchline";
import { Close, CLOSE_DURATION } from "./scenes/Close";

interface SceneEntry {
  name: string;
  Component: React.FC;
  duration: number;
}

const SCENES: SceneEntry[] = [
  { name: "Hook", Component: Hook, duration: HOOK_DURATION },
  { name: "Scattered", Component: Scattered, duration: SCATTERED_DURATION },
  { name: "Gather", Component: Gather, duration: GATHER_DURATION },
  { name: "Ask", Component: Ask, duration: ASK_DURATION },
  { name: "Punchline", Component: Punchline, duration: PUNCHLINE_DURATION },
  { name: "Close", Component: Close, duration: CLOSE_DURATION },
];

const TOTAL_DURATION = SCENES.reduce((total, scene) => total + scene.duration, 0);

const Promo: React.FC = () => {
  let cursor = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      {SCENES.map(({ name, Component, duration }) => {
        const from = cursor;
        cursor += duration;
        return (
          <Sequence key={name} name={name} from={from} durationInFrames={duration}>
            <Component />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ClubBrainPromo"
    component={Promo}
    durationInFrames={TOTAL_DURATION}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
