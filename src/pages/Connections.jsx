import UpperPiecePuzzle from "../components/UpperPiecePuzzle";
import LowerPiecePuzzle from "../components/LowerPiecePuzzle";
import styles from "./Connections.module.css";

export default function Connections() {
  return (
    <main className={styles.main}>
      <section>3 pieces of puzzle...</section>
      {/* <section className={styles.gridContainer}>
        {array.forEach((element) => {
          <div key={element.id} className={styles.connection}>
            <UpperPiecePuzzle />
            <LowerPiecePuzzle />
          </div>;
        })};
      </section> */}

      <section className={styles.gridContainer}>
        <div>
          <UpperPiecePuzzle />
          <LowerPiecePuzzle />
        </div>
        <div>
          <UpperPiecePuzzle />
          <LowerPiecePuzzle />
        </div>
        <div>
          <UpperPiecePuzzle />
          <LowerPiecePuzzle />
        </div>
        <div>
          <UpperPiecePuzzle />
          <LowerPiecePuzzle />
        </div>
      </section>
    </main>
  );
}
