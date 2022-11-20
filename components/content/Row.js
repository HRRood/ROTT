import styles from "../../styles/components/content/Row.module.css";

export function Row({ children }) {
  return <div className={styles.row}>{children}</div>;
}
