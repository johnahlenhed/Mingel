import styles from "./LowerPiecePuzzle.module.css";

export default function LowerPiecePuzzle({ children }) {
  return (
    <article className={styles.lowerPuzzle}>
      <div className={styles.dotInLower}></div>
      <div className={styles.content}>{children}</div>
    </article>
  );
}
