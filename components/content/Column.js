import styles from "../../styles/components/content/Column.module.css";

export function Column({ children, width = 0, smWidth = 0, mdWidth = 0, lgWidth = 0, xlWidth = 0 }) {
  return (
    <div
      className={`${styles.column} ${styles[`column_${width}`]} ${styles[`columnsm_${smWidth}`]} ${styles[`columnmd_${mdWidth}`]} ${
        styles[`columnlg_${lgWidth}`]
      } ${styles[`columnxl_${xlWidth}`]}`}
    >
      {children}
    </div>
  );
}
