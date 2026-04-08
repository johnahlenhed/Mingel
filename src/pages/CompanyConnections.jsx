import UpperPiecePuzzle from "../components/UpperPiecePuzzle";
import LowerPiecePuzzle from "../components/LowerPiecePuzzle";
import NavigationButton from "../components/NavigationButton";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./CompanyConnections.module.css";
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
      <section className={styles.gridContainer}>
        {rows?.map((row) => (
          <Link key={row.id} to={`/company-contacts/${row.id}`}>
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
      </section>

      <section className={styles.navbar}>
        <Link to="/company1">
          <NavigationButton>Home</NavigationButton>
        </Link>
      </section>
    </main>
  );
}
