import styles from "./LowerPiecePuzzle.module.css";

export default function LowerPiecePuzzle({ children, variant = "default" }) {
  return (
    <article className={`${styles.lowerPuzzle} ${styles[variant]}`}>
      <div className={styles.content}>{children}</div>
    </article>
  );
}
