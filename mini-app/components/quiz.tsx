"use client";

import { useState } from "react";
import Result from "./result";

type Question = {
  text: string;
  options: { label: string; animal: string }[];
};

const questions: Question[] = [
  {
    text: "What is your favorite type of food?",
    options: [
      { label: "Meat", animal: "cat" },
      { label: "Fish", animal: "cat" },
      { label: "Berries", animal: "fox" },
      { label: "Seeds", animal: "hamster" },
      { label: "Grain", animal: "horse" },
    ],
  },
  {
    text: "Which environment do you prefer?",
    options: [
      { label: "Urban", animal: "cat" },
      { label: "Forest", animal: "fox" },
      { label: "Farm", animal: "horse" },
      { label: "Pet store", animal: "dog" },
      { label: "Cage", animal: "hamster" },
    ],
  },
  {
    text: "What is your energy level?",
    options: [
      { label: "Low", animal: "hamster" },
      { label: "Medium", animal: "dog" },
      { label: "High", animal: "fox" },
      { label: "Very high", animal: "horse" },
      { label: "Variable", animal: "cat" },
    ],
  },
  {
    text: "How do you like to communicate?",
    options: [
      { label: "Bark", animal: "dog" },
      { label: "Whine", animal: "cat" },
      { label: "Squeak", animal: "hamster" },
      { label: "Whistle", animal: "fox" },
      { label: "Neigh", animal: "horse" },
    ],
  },
  {
    text: "What is your favorite activity?",
    options: [
      { label: "Chasing", animal: "dog" },
      { label: "Sleeping", animal: "cat" },
      { label: "Running", animal: "horse" },
      { label: "Hiding", animal: "fox" },
      { label: "Nibbling", animal: "hamster" },
    ],
  },
];

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (animal: string) => {
    setAnswers((prev) => [...prev, animal]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const scores: Record<string, number> = {
        cat: 0,
        dog: 0,
        fox: 0,
        hamster: 0,
        horse: 0,
      };
      answers.concat(animal).forEach((a) => {
        scores[a] = (scores[a] ?? 0) + 1;
      });
      const maxAnimal = Object.entries(scores).reduce((a, b) =>
        b[1] > a[1] ? b : a
      )[0];
      setResult(maxAnimal);
    }
  };

  const handleRetake = () => {
    setCurrent(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    return <Result animal={result} onRetake={handleRetake} />;
  }

  const currentQuestion = questions[current];
  const shuffledOptions = shuffle(currentQuestion.options);

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{currentQuestion.text}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt) => (
          <button
            key={opt.label}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            onClick={() => handleAnswer(opt.animal)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
