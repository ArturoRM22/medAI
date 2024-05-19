"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function Typper() {
  const words = [
    {
      text: "Take",
    },
    {
      text: "Care",
    },
    {
      text: "of",
    },
    {
      text: "your",
    },
    {
      text: "health",
    },
    {
      text: "with",
    },
    {
      text: "Med AI.",
      className: "text-green-500 dark:text-green-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[10rem]  ">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
