import styles from "./CompanyHome.module.css";
import LowerPiecePuzzle from "../components/application/LowerPiecePuzzle";
import DisplayDigit from "../components/DisplayDigit";
import NavigationButton from "../components/application/NavigationButton";
import UpperPiecePuzzle from "../components/application/UpperPiecePuzzle";
import { Link } from "react-router-dom";

export default function CompanyHome() {
  return (
    <main className={styles.layout}>
      <section className={styles.rotatedContainer}>
        <LowerPiecePuzzle variant="lightBorderDashed"></LowerPiecePuzzle>
      </section>

      <section>
        <article className={styles.codeContainer}>
          <DisplayDigit></DisplayDigit>
        </article>
      </section>
      <section className={styles.rotatedContainer}>
        <UpperPiecePuzzle variant="lightBorderDashed"></UpperPiecePuzzle>
      </section>

      <section className={styles.navigation}>
        <Link to="/company2">
          <NavigationButton>
            Connections <img src="../../arrow_right.svg" />
          </NavigationButton>
        </Link>
      </section>

      <div>
        <a>Change the URL you share</a>
      </div>
    </main>
  );
}
