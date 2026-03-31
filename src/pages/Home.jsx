import { useState } from "react";
import styles from "./Home.module.css";
import UpperPiecePuzzle from "../components/UpperPiecePuzzle";
import LowerPiecePuzzle from "../components/LowerPiecePuzzle";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.layout}>
        <div className={styles.upperContainer}>
          <UpperPiecePuzzle />
        </div>

        <article className={styles.form}>
          <label className={styles.label}></label>
          <input
            className={styles.input}
            placeholder="0000"
            type="number"
            inputmode="numeric"
          ></input>
          <button className={styles.button}>Connect</button>
        </article>

        <div className={styles.lowerContainer}>
          <LowerPiecePuzzle />
        </div>

        <article className={styles.myConnectionsContainer}>
          <Link to="/connections">
            <button className={styles.myConnections}>
              My connections (icon)
            </button>
          </Link>
        </article>
      </section>
    </main>
  );
}
