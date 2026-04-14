import styles from "./RegisterComplete.module.css";
import { Link } from "react-router-dom";
import AddToCalendar from "../components/AddToCalendar.jsx";

export default function RegisterComplete() {
  return (
    <main className={styles.registerComplete}>
      <section className={styles.textContainer}>
        <h2>All set up!</h2>
        <p>
          You will receieve an email with further information as well as a
          password for signing in before the event.
        </p>

        <div className={styles.calendarBtnWrapper}>
          <AddToCalendar />
        </div>
        <Link to="/login">
          <button className={styles.loginBtn}>Login</button>
        </Link>
      </section>
    </main>
  );
}
