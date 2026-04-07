import { useState } from "react";
import styles from "./Home.module.css";
import UpperPiecePuzzle from "../components/UpperPiecePuzzle";
import LowerPiecePuzzle from "../components/LowerPiecePuzzle";
import NavigationButton from "../components/NavigationButton";
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
          <div className={styles.addBtn}>
            <NavigationButton>Add +</NavigationButton>
          </div>
        </article>

        <div className={styles.lowerContainer}>
          <LowerPiecePuzzle />
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
