import React from "react";
import { AbsoluteFill, Composition, Sequence } from "remotion";
import { FPS, theme } from "./theme";
import { Hook, HOOK_DURATION } from "./scenes/Hook";
import { Problem, PROBLEM_DURATION } from "./scenes/Problem";
import { Intro, INTRO_DURATION } from "./scenes/Intro";
import { Capture, CAPTURE_DURATION } from "./scenes/Capture";
import { Handoff, HANDOFF_DURATION } from "./scenes/Handoff";
import { Payoff, PAYOFF_DURATION } from "./scenes/Payoff";
import { Roadmap, ROADMAP_DURATION } from "./scenes/Roadmap";
import { Close, CLOSE_DURATION } from "./scenes/Close";

interface SceneEntry {
  name: string;
  Component: React.FC;
  duration: number;
}

const SCENES: SceneEntry[] = [
  { name: "Hook", Component: Hook, duration: HOOK_DURATION },
  { name: "Problem", Component: Problem, duration: PROBLEM_DURATION },
  { name: "Intro", Component: Intro, duration: INTRO_DURATION },
  { name: "Capture", Component: Capture, duration: CAPTURE_DURATION },
  { name: "Handoff", Component: Handoff, duration: HANDOFF_DURATION },
  { name: "Payoff", Component: Payoff, duration: PAYOFF_DURATION },
  { name: "Roadmap", Component: Roadmap, duration: ROADMAP_DURATION },
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
