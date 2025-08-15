// HeroSection.jsx
"use client";
import { useScroll, useTransform } from "motion/react";
import React from "react";
import { HomeSectionEffect } from "./ui._publics/HomeSectionEffect";

export function HeroSection({
  title = "Social Reminder via WhatsApp + AI",
  description = `TemanIngat membantu kamu mengatur janji, to‑do, dan follow‑up—untuk
            diri sendiri maupun ke teman—cukup lewat WhatsApp. AI kami paham
            bahasa natural dan menjaga nada komunikasi tetap personal.`,
}) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
      ref={ref}
    >
      <HomeSectionEffect
        title={title}
        description={description}
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}
