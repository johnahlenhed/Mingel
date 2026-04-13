import { useRef, useState } from "react";
import styles from "./DigitInput.module.css";

export default function FourDigitInput({ onComplete, onChangeCode }) {
  const [values, setValues] = useState(["", "", "", ""]);
  const refs = useRef([]);

  const handleChange = (value, index) => {
    // Only allow empty or number
    if (value.length > 1) return;
    if (value && isNaN(Number(value))) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (onChangeCode) {
      onChangeCode(newValues.join(""));
    }

    // Jump forward
    if (value && index < 3) {
      refs.current[index + 1].focus();
    }

    // When all fileds are filled
    if (newValues.every((v) => v !== "")) {
      onComplete(newValues.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace: go back if field is empty
    if (e.key === "Backspace" && !values[index] && index > 0) {
      refs.current[index - 1].focus();
    }
  };

  return (
    <div className={styles.container}>
      {values.map((val, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          value={val}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          maxLength={1}
          inputMode="numeric"
          type="text"
          className={styles.inputBox}
        />
      ))}
    </div>
  );
}
