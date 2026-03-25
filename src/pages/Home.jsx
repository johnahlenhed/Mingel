import { useState } from "react";
import styles from "./Home.module.css";
import UpperPiecePuzzle from "../components/UpperPiecePuzzle";
import LowerPiecePuzzle from "../components/LowerPiecePuzzle";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <UpperPiecePuzzle />

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

        <LowerPiecePuzzle />

        <article className={styles.myConnectionsContainer}>
          <button className={styles.myConnections}>
            My connections (icon)
          </button>
        </article>
      </section>
    </main>
  );
}
