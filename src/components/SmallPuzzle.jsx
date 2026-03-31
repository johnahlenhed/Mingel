import styles from "./SmallPuzzle.module.css";

export default function SmallPuzzle() {
  return (
    <>
      <article className={styles.leftPiece}>
        <div className={styles.leftPieceRightKnob}></div>
      </article>
      <article className={styles.middlePiece}>
        <div className={styles.middlePieceLeftKnob}></div>
        <div className={styles.middlePieceRightKnob}></div>
      </article>
      <article className={styles.rightPiece}>
        <div className={styles.rightPieceLeftKnob}></div>
      </article>
    </>
  );
}
