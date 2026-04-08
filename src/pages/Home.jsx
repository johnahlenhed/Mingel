import { useState } from "react";
import styles from "./Home.module.css";
import UpperPiecePuzzle from "../components/UpperPiecePuzzle";
import DigitInput from "../components/DigitInput";
import LowerPiecePuzzle from "../components/LowerPiecePuzzle";
import NavigationButton from "../components/NavigationButton";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.layout}>
        <div className={styles.upperContainer}>
          <UpperPiecePuzzle variant="lightBorderDashed"></UpperPiecePuzzle>
        </div>

        <article className={styles.form}>
          <DigitInput
            onComplete={(code) => {
              console.log("Code:", code);
            }}
          ></DigitInput>
          <div className={styles.addBtn}>
            <NavigationButton>Add +</NavigationButton>
          </div>
        </article>

        <div className={styles.lowerContainer}>
          <LowerPiecePuzzle variant="lightBorderDashed" />
        </div>

        <article className={styles.linksContainer}>
          <div className={styles.myConnectionsContainer}>
            <Link to="/connections">
              <NavigationButton>Connections (icon)</NavigationButton>
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
