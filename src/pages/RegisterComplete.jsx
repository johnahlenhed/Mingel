import styles from "./RegisterComplete.module.css";
import WhiteButton from "../components/register/WhiteButton";

export default function RegisterComplete() {
  return (
    <main className={styles.registerComplete}>
      <section className={styles.textContainer}>
        <h2>All set up!</h2>
        <p>
          You will receieve an email with further information as well as a
          password for signing in before the event.
        </p>

        <button className={styles.calendarBtn}>Add to Calendar +</button>
      </section>
    </main>
  );
}
