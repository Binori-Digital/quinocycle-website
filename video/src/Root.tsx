import React from "react";
import { Composition } from "remotion";
import { MovingBoxesVideo, TOTAL_FRAMES } from "./MovingBoxesVideo";

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="MovingBoxes"
        component={MovingBoxesVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
    </>
  );
}
