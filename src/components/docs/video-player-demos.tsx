"use client";

import { VideoPlayer } from "@work-rjkashyap/unified-ui";

export function DemoOnEnded() {
  return (
    <VideoPlayer
      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
      poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg"
      onEnded={() => alert("Video finished!")}
    />
  );
}
