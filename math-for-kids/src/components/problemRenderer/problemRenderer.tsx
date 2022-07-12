import React, { useEffect, useRef, useState } from 'react';
import { ITask } from '../../tasks/ITask';
import { MathProblem } from '../../tasks/math';
import { MusicTask } from '../../tasks/music';
import styles from './problemRenderer.module.scss';
import treble_clef from '../../assets/img/clefs/treble_clef.svg';
import bass_clef from '../../assets/img/clefs/bass_clef.svg';
import note from '../../assets/img/clefs/note.svg';

type ProblemRendererProps = {
  problem: ITask;
};

const ProblemRenderer: React.FC<ProblemRendererProps> = ({ problem }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [trebleClefImage, setTrebleClefImage] = useState<HTMLImageElement>();
  const [bassClefImage, setBassClefImage] = useState<HTMLImageElement>();
  const [noteImage, setNoteImage] = useState<HTMLImageElement>();
  const [allReady, setAllReady] = useState<Promise<unknown>>();

  useEffect(() => {
    let imgTreble = new Image();
    imgTreble.src = treble_clef;
    var trebleReady = new Promise(function (resolve) {
      imgTreble.addEventListener('load', resolve, false);
    });

    let imgBass = new Image();
    imgBass.src = bass_clef;
    var bassReady = new Promise(function (resolve) {
      imgBass.addEventListener('load', resolve, false);
    });

    let imgNote = new Image();
    imgNote.src = note;
    var noteReady = new Promise(function (resolve) {
      imgNote.addEventListener('load', resolve, false);
    });

    let allReady = Promise.all([trebleReady, bassReady, noteReady]).then(() => {
      setTrebleClefImage(imgTreble);
      setBassClefImage(imgBass);
      setNoteImage(imgNote);
    });

    setAllReady(allReady);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const musicProblem = problem as MusicTask;
    let scaleRatio = 1;
    if (canvas && context && musicProblem) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      //Our first draw
      context.fillStyle = '#00FF00';
      scaleRatio = 50 / canvas.height;

      allReady?.then(() => {
        const clefImage =
          musicProblem.clef === 'treble' ? trebleClefImage! : bassClefImage!;

        //And then draw using the recalculated height of image for destination
        context.drawImage(
          clefImage,
          0,
          0,
          clefImage.width,
          clefImage.height, // source size
          20 * scaleRatio,
          musicProblem.clef === 'treble' ? 68 * scaleRatio : 120 * scaleRatio,
          clefImage.width * scaleRatio * 7.5,
          clefImage.height * scaleRatio * 7.5
        ); // destination size

        var noteIndex =
          musicProblem.clef === 'treble'
            ? musicProblem.note
            : musicProblem.note - 2;
        // si (6) is in the middle of the middle line
        let noteYCoord =
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
          noteImage!.height * scaleRatio * 6
        ); // destination size

        //Draw additional lines for the note, if needed
        if (noteIndex < 1) {
          context.beginPath();
          let y = (120 + 5 * 45) * scaleRatio;
          context.moveTo((300 - 50) * scaleRatio, y);
          context.lineTo((300 + 120) * scaleRatio, y);
          context.stroke();
          context.closePath();
        }

        if (noteIndex < -1) {
          context.beginPath();
          let y = (120 + 6 * 45) * scaleRatio;
          context.moveTo((300 - 50) * scaleRatio, y);
          context.lineTo((300 + 120) * scaleRatio, y);
          context.stroke();
          context.closePath();
        }

        if (noteIndex > 11) {
          context.beginPath();
          let y = (120 - 1 * 45) * scaleRatio;
          context.moveTo((300 - 50) * scaleRatio, y);
          context.lineTo((300 + 120) * scaleRatio, y);
          context.stroke();
          context.closePath();
        }
        if (noteIndex > 13) {
          context.beginPath();
          let y = (120 - 2 * 45) * scaleRatio;
          context.moveTo((300 - 50) * scaleRatio, y);
          context.lineTo((300 + 120) * scaleRatio, y);
          context.stroke();
          context.closePath();
        }

        context.beginPath();
        for (let i = 0; i < 5; i++) {
          let y = (120 + i * 45) * scaleRatio;
          context.moveTo(0, y);
          context.lineTo(canvas.width, y);
          context.stroke();
        }
        context.closePath();
      });
    }
  }, [allReady, noteImage, problem, trebleClefImage]);

  if (problem instanceof MathProblem) {
    return (
      <>
        <span className={styles.argument1}>{problem.a1}</span>
        <span className={styles[problem.operation]}>
          {problem.operation === 'plus' ? '+' : '-'}
        </span>

        <span className={styles.argument2}>{problem.a2}</span>
        <span className={styles.equals}>=</span>
      </>
    );
  } else if (problem instanceof MusicTask) {
    return (
      <>
        <canvas
          className={styles.note}
          ref={canvasRef}
          style={{ borderWidth: '1px', borderStyle: 'solid' }}
        ></canvas>
        {/* <img className={styles.note} src={notes[problem.note]} alt="note"></img> */}
        <span className={styles.equals}>=</span>
      </>
    );
  } else throw new Error('unsupported problem type');
};

export default ProblemRenderer;
