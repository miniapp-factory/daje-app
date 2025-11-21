"use client";

import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type ResultProps = {
  animal: string;
  onRetake: () => void;
};

export default function Result({ animal, onRetake }: ResultProps) {
  const imageMap: Record<string, string> = {
    cat: "/cat.png",
    dog: "/dog.png",
    fox: "/fox.png",
    hamster: "/hamster.png",
    horse: "/horse.png",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">You are a {animal}!</h2>
      <img
        src={imageMap[animal]}
        alt={animal}
        width={256}
        height={256}
        className="rounded"
      />
      <Share text={`I am a ${animal}! ${url}`} />
      <button
        className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90"
        onClick={onRetake}
      >
        Retake Quiz
      </button>
    </div>
  );
}
