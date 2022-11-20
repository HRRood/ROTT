import styles from "../../styles/components/content/Block.module.css";
export function Block({ children }) {
  return <div className={styles.block}>{children}</div>;
}
