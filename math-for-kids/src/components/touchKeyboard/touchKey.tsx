import React from 'react';
import styles from './touchKey.module.scss';

type TouchKeyProps = {
  value: string;
  caption?: string;
  onKey: (key: string) => void;
  className?: string;
};

const TouchKey: React.FC<TouchKeyProps> = ({
  value,
  caption,
  onKey,
  className,
}) => (
  <button
    className={
      styles.button +
      ' ' +
      styles.noselect +
      ' ' +
      (className ? styles[className] : '')
    }
    onClick={(e) => onKey(value)}
  >
    {caption ?? value}
  </button>
);

export default TouchKey;
