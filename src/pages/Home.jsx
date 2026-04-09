import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import UpperPiecePuzzle from "../components/UpperPiecePuzzle";
import DigitInput from "../components/DigitInput";
import LowerPiecePuzzle from "../components/LowerPiecePuzzle";
import NavigationButton from "../components/NavigationButton";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase.js";

export default function Home() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase.from("users").select("*").limit(1);

      if (error) {
        console.error("Supabase error:", error);
      } else {
        console.log("Supabase data:", data);
        setUserData(data[0]); // <-- spara första raden
      }
    }

    loadData();
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.layout}>
        <div className={styles.upperContainer}>
          <UpperPiecePuzzle variant="lightBorderDashed" />
        </div>

        <article className={styles.form}>
          <DigitInput
            onComplete={(code) => {
              console.log("Code:", code);
            }}
          />
          <div className={styles.addBtnContainer}>
            <button className={styles.addBtn}>Add +</button>
          </div>
        </article>

        <div className={styles.lowerContainer}>
          <LowerPiecePuzzle variant="lightBorderDashed">
            <div className={styles.lowerContent}>
              {userData ? (
                <>
                  <p>{userData.full_name}</p>
                  <p>{userData.programme}</p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </LowerPiecePuzzle>
        </div>

        <article className={styles.linksContainer}>
          <div className={styles.myConnectionsContainer}>
            <Link to="/connections">
              <NavigationButton>
                <div className={styles.navContent}>
                  <span>Connections</span>
                  <img
                    className={styles.arrowIcon}
                    src="../../arrow_right.svg"
                  />
                </div>
              </NavigationButton>
            </Link>
          </div>
          <div>
            <a>Change the URL you share</a>
          </div>
        </article>
      </section>
    </main>
  );
}
