import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import styles from "./DisplayDigit.module.css";
import { useUser } from "../../lib/useUser";

export default function FourDigitDisplay() {
  const user = useUser();

  // If no code - show empty slots
  const digits = user?.code ? user.code.split("") : ["", "", "", ""];

  return (
    <div className={styles.container}>
      {digits.map((d, i) => (
        <div key={i} className={styles.box}>
          {d}
        </div>
      ))}
    </div>
  );
}
