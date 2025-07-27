import React from "react";
import { allNotesEn, allNotesRu, allNumbers } from "../../assets/data/arrays";
import { OpMode } from "../../tasks/ITask";
import TouchKey from "./touchKey";
import styles from "./touchKeyboard.module.scss";
type TouchKeyboardProps = {
  onKey: (key: string) => void;
  mode: OpMode;
  allowSubmit: boolean;
  lang: "en" | "ru";
};

const TouchKeyboard: React.FC<TouchKeyboardProps> = ({
  onKey,
  mode,
  allowSubmit,
  lang,
}) => {
  const values: string[] =
    mode !== "music" ? allNumbers : lang === "ru" ? allNotesRu : allNotesEn;

  return (
    <div
      className={mode === "music" ? styles.containerSmall : styles.container}
    >
      {values.map((v) => (
        <TouchKey value={v} onKey={onKey} key={v} enabled />
      ))}

      <TouchKey
        value={"Delete"}
        caption="⌫"
        onKey={onKey}
        className="delete"
        enabled
      />
      <TouchKey
        value={"Enter"}
        caption="▶"
        onKey={onKey}
        className="enter"
        enabled={allowSubmit}
      />
    </div>
  );
};

export default TouchKeyboard;
