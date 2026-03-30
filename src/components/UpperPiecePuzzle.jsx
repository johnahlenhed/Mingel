import styles from "./UpperPiecePuzzle.module.css";

export default function UpperPiecePuzzle({ children }) {
  return (
    <article className={styles.upperPuzzle}>
      <div className={styles.content}>{children}</div>
    </article>
  );
}
