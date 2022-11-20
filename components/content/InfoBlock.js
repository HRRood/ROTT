import styles from "../../styles/components/content/InfoBlock.module.css";
export function InfoBlock({ children, type }) {
  return <div className={`${styles.info_block} ${styles[`info_block_${type}`]}`}>{children}</div>;
}
