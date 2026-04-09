import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import styles from "./DisplayDigit.module.css";

export default function FourDigitDisplay() {
  const [code, setCode] = useState("");

  useEffect(() => {
    async function loadCode() {
      const { data, error } = await supabase
        .from("codes") // <-- adjust to DB
        .select("code") // <-- adjust to DB
        .limit(1)
        .single();

      if (error) {
        console.error("Error loading code:", error);
        return;
      }

      setCode(data.code); // ie "4821"
    }

    loadCode();
  }, []);

  // If no code - show empty slots
  const digits = code ? code.split("") : ["", "", "", ""];

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
