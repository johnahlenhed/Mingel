import styles from "./UpperPiecePuzzle.module.css";

export default function UpperPiecePuzzle({ children, variant = "default" }) {
  return (
    <article className={`${styles.upperPuzzle} ${styles[variant]}`}>
      <div className={styles.content}>{children}</div>
    </article>
  );
}
