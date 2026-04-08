import styles from "./CompanyHome.module.css";
import LowerPiecePuzzle from "../components/LowerPiecePuzzle";
import NavigationButton from "../components/NavigationButton";
import { Link } from "react-router-dom";

export default function CompanyHome() {
  return (
    <main className={styles.layout}>
      <section className={styles.rotatedContainer}>
        <LowerPiecePuzzle variant="lightBorderDashed"></LowerPiecePuzzle>
      </section>

      <section>
        <article className={styles.codeContainer}>
          <p className={styles.connectionCode}>0000</p>
        </article>
        <article className={styles.editBtnContainer}>
          <button>Edit contact info</button>
        </article>
      </section>

      <section className={styles.navigation}>
        <Link to="/company2">
          <NavigationButton>Connections</NavigationButton>
        </Link>
      </section>
    </main>
  );
}
