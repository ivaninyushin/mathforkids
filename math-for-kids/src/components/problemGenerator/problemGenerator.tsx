import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { allNotesEn, allNotesRu, allNumbers } from "../../assets/data/arrays";
import gnome from "../../assets/img/gnomes.png";
import Poop from "../../assets/img/poop.min.svg?react";
import Star from "../../assets/img/star.min.svg?react";
import { ITask, OpMode } from "../../tasks/ITask";
import { generateMathProblem } from "../../tasks/math";
import { generateMusicTask } from "../../tasks/music";
import Answer from "../answer/answer";
import ClefSelector from "../clefSelector/clefSelector";
import Fireworks from "../fireworks/fireworks";
import ProblemRenderer from "../problemRenderer/problemRenderer";
import TouchKeyboard from "../touchKeyboard/touchKeyboard";
import { clefVariants } from "./clefVariants";

type ProblemGeneratorProps = { mode: OpMode; lang: "en" | "ru" };

const processKey = (
  key: string,
  answer: string,
  mode: OpMode,
  lang: "en" | "ru",
) => {
  const allNotes = lang === "en" ? allNotesEn : allNotesRu;

  if (key === "Backspace" || key === "Delete") {
    return mode !== "music" ? answer.substring(0, answer.length - 1) : "";
  } else if (mode !== "music" && allNumbers.includes(key)) {
    return answer.length < 2 ? answer + key : answer;
  } else if (mode === "music" && allNotes.includes(key)) {
    return key;
  }
  return answer;
};

// Number of stars that equal to one gnome
const starsToGnome = 3;
const generateTask = (
  mode: ProblemGeneratorProps["mode"],
  clef: clefVariants | undefined,
) => (mode === "music" ? generateMusicTask(clef!) : generateMathProblem(mode));

const ProblemGenerator: React.FC<ProblemGeneratorProps> = ({ mode, lang }) => {
  const [fireworks, setFireworks] = useState(false);
  const [answer, setAnswer] = useState("");
  const [wrong, setWrong] = useState(false);
  const [stars, setStars] = useState<number[]>([]);
  const allNotes = lang === "en" ? allNotesEn : allNotesRu;

  const [clef, setClef] = useState<clefVariants | undefined>(undefined);
  const [problem, setProblem] = useState<ITask>();

  useEffect(() => {
    if (mode !== "music" || (mode === "music" && clef)) {
      setProblem(generateTask(mode, clef));
    }
  }, [clef, mode]);

  const handleCorrectAnswer = useCallback(
    (problem: ITask) => {
      setFireworks(true);
      setTimeout(
        () => {
          setFireworks(false);
          setProblem(generateTask(mode, clef));
        },
        problem.getProblemComplexity() * 1000 * 12,
      );
    },
    [mode, clef],
  );

  const handleAnswer = useCallback(
    (answer: number, problem: ITask) => {
      if (problem.isCorrectAnswer(answer)) {
        setAnswer("");
        if (stars.filter((v) => v === 1).length >= starsToGnome - 1) {
          let index = 0;
          const newStars: number[] = [];
          for (let i = 0; i < stars.length; i++) {
            if (stars[i] === 1 && index < starsToGnome - 1) {
              index++;
            } else {
              newStars.push(stars[i]);
            }
          }
          newStars.push(starsToGnome);
          setStars(newStars);
        } else {
          setStars((s) => [...s, 1]);
        }
        handleCorrectAnswer(problem);
      } else {
        setWrong(true);
        setStars((s) => [...s, -1]);
        setTimeout(() => {
          setWrong(false);
          setAnswer("");
        }, 700);
      }
    },
    [handleCorrectAnswer, stars],
  );

  const handleTouchKey = (key: string) => {
    if (!fireworks && !wrong) {
      if (key === "Enter") {
        const value =
          mode !== "music" ? parseInt(answer) : allNotes.indexOf(answer);
        handleAnswer(value, problem!);
      }
      setAnswer((answer) => processKey(key, answer, mode, lang));
    }
  };

  const selectClef = (clef: clefVariants) => {
    setClef(clef);
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (!fireworks && !wrong) {
        if (event.key === "Enter") {
          event.preventDefault();
          const value =
            mode !== "music" ? parseInt(answer) : allNotes.indexOf(answer);
          handleAnswer(value, problem!);
        } else {
          setAnswer((answer) => processKey(event.key, answer, mode, lang));
        }
      }
    };

    document.addEventListener("keydown", listener);

    return function cleanup() {
      document.removeEventListener("keydown", listener);
    };
  }, [answer, fireworks, handleAnswer, problem, wrong, mode, allNotes, lang]);

  return fireworks ? (
    <Fireworks />
  ) : mode === "music" && !clef ? (
    <ClefSelector onSelected={(clef) => selectClef(clef)} />
  ) : (
    <>
      <div className="flex flex-col justify-start items-center w-9/10 mx-auto h-full">
        <div className="flex flex-row items-start justify-start h-1/10 w-full">
          {stars.map((s, i) =>
            s === 1 ? (
              <Star key={i} className={"h-full"} />
            ) : s === starsToGnome ? (
              <img src={gnome} alt="gnome" key={i} className={"h-full"} />
            ) : (
              <Poop key={i} className={"h-full"} />
            ),
          )}
        </div>
        <div className="grow flex flex-row items-center justify-start w-full max-h-1/2">
          <div className="flex-1">
            {problem && <ProblemRenderer problem={problem!}></ProblemRenderer>}
          </div>
          <span className={`text-amber-500`}>=</span>
          <Answer answer={answer} isWrong={wrong}></Answer>
        </div>
        <TouchKeyboard
          onKey={handleTouchKey}
          mode={mode}
          lang={lang}
          allowSubmit={answer?.length > 0 === true}
        ></TouchKeyboard>
        <div className={`flex flex-row justify-between shrink w-full`}>
          <Link to="/" className={`text-2xl`}>
            Change mode
          </Link>

          <Link to="/donate" className={`text-2xl`}>
            Donate
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProblemGenerator;
