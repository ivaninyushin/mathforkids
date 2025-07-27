import React, { useEffect, useRef, useState } from "react";
import bass_clef from "../../assets/img/clefs/bass_clef.svg";
import note from "../../assets/img/clefs/note.svg";
import treble_clef from "../../assets/img/clefs/treble_clef.svg";
import { ITask } from "../../tasks/ITask";
import { MathProblem } from "../../tasks/math";
import { MusicTask } from "../../tasks/music";
import { clefVariants } from "../problemGenerator/clefVariants";
import styles from "./problemRenderer.module.scss";

type ProblemRendererProps = { problem: ITask };

const ProblemRenderer: React.FC<ProblemRendererProps> = ({ problem }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [trebleClefImage, setTrebleClefImage] = useState<HTMLImageElement>();
  const [bassClefImage, setBassClefImage] = useState<HTMLImageElement>();
  const [noteImage, setNoteImage] = useState<HTMLImageElement>();
  const [allReady, setAllReady] = useState<Promise<unknown>>();

  useEffect(() => {
    const imgTreble = new Image();
    imgTreble.src = treble_clef;
    const trebleReady = new Promise(function (resolve) {
      imgTreble.addEventListener("load", resolve, false);
    });

    const imgBass = new Image();
    imgBass.src = bass_clef;
    const bassReady = new Promise(function (resolve) {
      imgBass.addEventListener("load", resolve, false);
    });

    const imgNote = new Image();
    imgNote.src = note;
    const noteReady = new Promise(function (resolve) {
      imgNote.addEventListener("load", resolve, false);
    });

    const allReady = Promise.all([trebleReady, bassReady, noteReady]).then(
      () => {
        setTrebleClefImage(imgTreble);
        setBassClefImage(imgBass);
        setNoteImage(imgNote);
      },
    );

    setAllReady(allReady);
  }, []);

  useEffect(() => {
    const redraw = () => {
      redrawCanvas(
        canvasRef,
        problem,
        allReady,
        trebleClefImage,
        bassClefImage,
        noteImage,
      );
    };
    redraw();
    window.addEventListener("resize", redraw); // Update on resize
    return () => {
      window.removeEventListener("resize", redraw); // Cleanup
    };
  }, [canvasRef, allReady, bassClefImage, noteImage, problem, trebleClefImage]);

  if (problem instanceof MathProblem) {
    return (
      <div className={`flex flex-row items-left justify-baseline`}>
        <span className={styles.argument1}>{problem.a1}</span>
        <span className={styles[problem.operation]}>
          {problem.operation === "plus"
            ? "+"
            : problem.operation === "minus"
              ? "-"
              : problem.operation === "multiply"
                ? "×"
                : "÷"}
        </span>

        <span className={styles.argument2}>{problem.a2}</span>
      </div>
    );
  } else if (problem instanceof MusicTask) {
    return <canvas className={`w-full h-auto`} ref={canvasRef}></canvas>;
  } else throw new Error("unsupported problem type");
};

export default ProblemRenderer;
function redrawCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  problem: ITask,
  allReady: Promise<unknown> | undefined,
  trebleClefImage: HTMLImageElement | undefined,
  bassClefImage: HTMLImageElement | undefined,
  noteImage: HTMLImageElement | undefined,
) {
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");
  const musicProblem = problem as MusicTask;
  let scaleRatio = 1;
  if (canvas && context && musicProblem) {
    canvas.height = Math.round(canvas.width / 2);

    context.clearRect(0, 0, canvas.width, canvas.height);
    //Our first draw
    context.fillStyle = "#00FF00";

    scaleRatio = 50 / canvas.height;

    allReady?.then(() => {
      const clefImage =
        musicProblem.clef === clefVariants.treble
          ? trebleClefImage!
          : bassClefImage!;
      if (!clefImage || !noteImage) return;
      //And then draw using the recalculated height of image for destination
      context.drawImage(
        clefImage,
        0,
        0,
        clefImage.width,
        clefImage.height, // source size
        20 * scaleRatio,
        musicProblem.clef === clefVariants.treble
          ? 68 * scaleRatio
          : 120 * scaleRatio,
        clefImage.width * scaleRatio * 7.5,
        clefImage.height * scaleRatio * 7.5,
      ); // destination size

      const noteIndex =
        musicProblem.clef === clefVariants.treble
          ? musicProblem.note
          : musicProblem.note - 2;
      // si (6) is in the middle of the middle line
      const noteYCoord =
        (((6 - noteIndex) * 45) / 2 + 120 + 45 * 1.5) * scaleRatio;
      context.drawImage(
        noteImage!,
        0,
        0,
        noteImage!.width,
        noteImage!.height, // source size
        300 * scaleRatio,
        noteYCoord,
        noteImage!.width * scaleRatio * 6,
        noteImage!.height * scaleRatio * 6,
      ); // destination size

      //Draw additional lines for the note, if needed
      if (noteIndex < 1) {
        context.beginPath();
        const y = (120 + 5 * 45) * scaleRatio;
        context.moveTo((300 - 50) * scaleRatio, y);
        context.lineTo((300 + 120) * scaleRatio, y);
        context.stroke();
        context.closePath();
      }

      if (noteIndex < -1) {
        context.beginPath();
        const y = (120 + 6 * 45) * scaleRatio;
        context.moveTo((300 - 50) * scaleRatio, y);
        context.lineTo((300 + 120) * scaleRatio, y);
        context.stroke();
        context.closePath();
      }

      if (noteIndex > 11) {
        context.beginPath();
        const y = (120 - 1 * 45) * scaleRatio;
        context.moveTo((300 - 50) * scaleRatio, y);
        context.lineTo((300 + 120) * scaleRatio, y);
        context.stroke();
        context.closePath();
      }
      if (noteIndex > 13) {
        context.beginPath();
        const y = (120 - 2 * 45) * scaleRatio;
        context.moveTo((300 - 50) * scaleRatio, y);
        context.lineTo((300 + 120) * scaleRatio, y);
        context.stroke();
        context.closePath();
      }

      context.beginPath();
      for (let i = 0; i < 5; i++) {
        const y = (120 + i * 45) * scaleRatio;
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
      }
      context.closePath();
    });
  }
}
