import styles from "./DynamicBG.module.css";

export default function DynamicBG({ children }) {
  return <div className={styles.backgroundImg}>{children}</div>;
}
