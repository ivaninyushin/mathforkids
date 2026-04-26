import React from "react";
import { clefVariants } from "../problemGenerator/clefVariants";

import bass_clef from "../../assets/img/clefs/bass_clef.svg";
import treble_clef from "../../assets/img/clefs/treble_clef.svg";

type ClefSelectorProps = { onSelected: (clef: clefVariants) => void };

const ClefSelector: React.FC<ClefSelectorProps> = ({ onSelected }) => (
  <div
    className={`flex flex-col justify-around items-center w-9/10 mx-auto h-full`}
  >
    <img
      className={"flex-1 p-20 cursor-pointer opacity-70 hover:opacity-100"}
      src={treble_clef}
      alt="Treble clef"
      onClick={() => onSelected(clefVariants.treble)}
    />
    <img
      className={"flex-1 p-20 cursor-pointer opacity-70 hover:opacity-100"}
      src={bass_clef}
      alt="Bass clef"
      onClick={() => onSelected(clefVariants.bass)}
    />
  </div>
);
/* Exports */
export default ClefSelector;
