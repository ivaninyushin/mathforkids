import React from 'react';
import { clefVariants } from '../problemGenerator/clefVariants';

import styles from './clefSelector.module.scss';
import treble_clef from '../../assets/img/clefs/treble_clef.svg';
import bass_clef from '../../assets/img/clefs/bass_clef.svg';

type ClefSelectorProps = {
  onSelected: (clef: clefVariants) => void;
};

const ClefSelector: React.FC<ClefSelectorProps> = ({ onSelected }) => (
  <div className={styles.container}>
    <img
      className={styles.treble}
      src={treble_clef}
      alt="Treble clef"
      onClick={() => onSelected(clefVariants.treble)}
    />
    <img
      className={styles.bass}
      src={bass_clef}
      alt="Bass clef"
      onClick={() => onSelected(clefVariants.bass)}
    />
  </div>
);

export default ClefSelector;
