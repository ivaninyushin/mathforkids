import React from 'react';
import { allNotes, allNumbers } from '../../assets/data/arrays';
import TouchKey from './touchKey';
type TouchKeyboardProps = {
  onKey: (key: string) => void;
  mode: 'math' | 'music';
  allowSubmit: boolean;
};

const TouchKeyboard: React.FC<TouchKeyboardProps> = ({
  onKey,
  mode,
  allowSubmit,
}) => {
  const values: string[] = mode === 'math' ? allNumbers : allNotes;

  return (
    <>
      {values.map((v) => (
        <TouchKey value={v} onKey={onKey} key={v} enabled />
      ))}

      <TouchKey
        value={'Delete'}
        caption="⌫"
        onKey={onKey}
        className="delete"
        enabled
      />
      <TouchKey
        value={'Enter'}
        caption="▶"
        onKey={onKey}
        className="enter"
        enabled={allowSubmit}
      />
    </>
  );
};

export default TouchKeyboard;
