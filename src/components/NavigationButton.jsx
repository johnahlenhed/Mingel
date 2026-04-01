import styles from "./NavigationButton.module.css";

export default function NavigationButton({ children }) {
  return <button className={styles.btn}>{children}</button>;
}
