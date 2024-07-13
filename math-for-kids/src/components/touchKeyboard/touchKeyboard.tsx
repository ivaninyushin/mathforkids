import React from 'react';
import { allNotesRu, allNotesEn, allNumbers } from '../../assets/data/arrays';
import TouchKey from './touchKey';
import { OpMode } from '../../tasks/ITask';
type TouchKeyboardProps = {
  onKey: (key: string) => void;
  mode: OpMode;
  allowSubmit: boolean;
  lang: 'en' | 'ru';
};

const TouchKeyboard: React.FC<TouchKeyboardProps> = ({
  onKey,
  mode,
  allowSubmit,
  lang,
}) => {
  const values: string[] =
    mode !== 'music' ? allNumbers : lang === 'ru' ? allNotesRu : allNotesEn;

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
