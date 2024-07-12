import React from 'react';
import styles from './touchKey.module.scss';

type TouchKeyProps = {
  value: string;
  caption?: string;
  onKey: (key: string) => void;
  className?: string;
  enabled: boolean;
};

const TouchKey: React.FC<TouchKeyProps> = ({
  value,
  caption,
  onKey,
  className,
  enabled,
}) => (
  <button
    disabled={!enabled}
    className={
      styles.button +
      ' ' +
      styles.noselect +
      ' ' +
      (className ? styles[className] : '')
    }
    onClick={() => onKey(value)}
  >
    {caption ?? value}
  </button>
);

export default TouchKey;
