import UpperPiecePuzzle from "../components/UpperPiecePuzzle";
import LowerPiecePuzzle from "../components/LowerPiecePuzzle";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./Connections.module.css";
import { supabase } from "../lib/supabase.js";

export default function Connections() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase.from("Test_table").select("*");
      setRows(data);

      console.log("Supabase data:", data);
      console.log("Supabase error:", error);

      if (error) {
        console.error(error);
      } else {
        setRows(data);
      }
    }

    loadData();
  }, []);

  return (
    <main className={styles.main}>
      <section>3 pieces of puzzle...</section>
      <section className={styles.gridContainer}>
        {rows?.map((row) => (
          <div key={row.id} className={styles.puzzleWrapper}>
            <div className={styles.upperContainer}>
              <UpperPiecePuzzle>
                <div>
                  <p>{row.name}</p>
                  <p>{row.email}</p>
                </div>
              </UpperPiecePuzzle>
            </div>
            <div className={styles.lowerContainer}>
              <LowerPiecePuzzle>
                <div>
                  <p>{row.name}</p>
                  <p>{row.email}</p>
                </div>
              </LowerPiecePuzzle>
            </div>
          </div>
        ))}
      </section>

      {/* <section className={styles.gridContainer}>
        <div>
          <UpperPiecePuzzle />
          <LowerPiecePuzzle />
        </div>
        <div>
          <UpperPiecePuzzle />
          <LowerPiecePuzzle />
        </div>
        <div>
          <UpperPiecePuzzle />
          <LowerPiecePuzzle />
        </div>
        <div>
          <UpperPiecePuzzle />
          <LowerPiecePuzzle />
        </div>
      </section> */}
    </main>
  );
}
