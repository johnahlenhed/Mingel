import SmallPuzzle from "../components/SmallPuzzle.jsx";
import UpperPiecePuzzle from "../components/UpperPiecePuzzle";
import LowerPiecePuzzle from "../components/LowerPiecePuzzle";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Connections.module.css";
import { supabase } from "../lib/supabase.js";

export default function Connections() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase.from("users").select("*");
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
    <main className={styles.layout}>
      <section className={styles.smallPuzzleContainer}>
        <SmallPuzzle />
      </section>
      <section className={styles.gridContainer}>
        {rows?.map((row) => (
          <Link key={row.id} to={`/contacts/${row.id}`}>
            <div key={row.id} className={styles.puzzleWrapper}>
              <div className={styles.upperContainer}>
                <UpperPiecePuzzle>
                  <div>
                    <p>{row.full_name}</p>
                  </div>
                </UpperPiecePuzzle>
              </div>
              <div className={styles.lowerContainer}>
                <LowerPiecePuzzle>
                  <div>
                    <p>{row.full_name}</p>
                  </div>
                </LowerPiecePuzzle>
              </div>
            </div>
          </Link>
        ))}

        {/* Empty container */}
        <div className={styles.emptyContainer}>
          <div className={styles.upperContainer}>
            <UpperPiecePuzzle></UpperPiecePuzzle>
          </div>
          <div className={styles.lowerContainer}>
            <LowerPiecePuzzle></LowerPiecePuzzle>
          </div>
        </div>
      </section>

      <section className={styles.navbar}>
        <Link to="/">
          <button className={styles.navButton}>Home</button>
        </Link>
        <Link to="/">
          <button className={styles.navButton}>Add</button>
        </Link>
      </section>
    </main>
  );
}
