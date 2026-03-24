import { useState } from "react";
import styles from "./Landingpage.module.css";

export default function Landingpage() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <article className={styles.upperPuzzle}>
          {/* <div className={styles.dotInUpper}></div> */}
        </article>

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

        <article className={styles.lowerPuzzle}>
          <div className={styles.dotInLower}></div>
        </article>
        <article className={styles.myConnectionsContainer}>
          <button className={styles.myConnections}>
            My connections (icon)
          </button>
        </article>
      </section>
    </main>
  );
}
