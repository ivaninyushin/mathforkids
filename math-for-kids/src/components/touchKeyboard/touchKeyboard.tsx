import React from 'react';
import TouchKey from './touchKey';
type TouchKeyboardProps = {
  onKey: (key: string) => void;
};

const TouchKeyboard: React.FC<TouchKeyboardProps> = ({ onKey }) => {
  const values: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

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
