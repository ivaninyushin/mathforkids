import React from 'react';
import { allNotes, allNumbers } from '../../assets/data/arrays';
import TouchKey from './touchKey';
type TouchKeyboardProps = {
  onKey: (key: string) => void;
  mode: 'math' | 'music';
};

const TouchKeyboard: React.FC<TouchKeyboardProps> = ({ onKey, mode }) => {
  const values: string[] = mode === 'math' ? allNumbers : allNotes;

  return (
    <>
      {values.map((v) => (
        <TouchKey value={v} onKey={onKey} key={v} />
      ))}

      <TouchKey value={'Delete'} caption="⌫" onKey={onKey} className="delete" />
      <TouchKey value={'Enter'} caption="▶" onKey={onKey} className="enter" />
    </>
  );
};

export default TouchKeyboard;
