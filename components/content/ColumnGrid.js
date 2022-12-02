import styles from "../../styles/components/content/ColumnGrid.module.css";

export function ColumnGrid({
  children,
  width = 0,
  smWidth = 0,
  mdWidth = 0,
  lgWidth = 0,
  xlWidth = 0,
}) {
  return (
    <div
      className={`${styles.columngrid} ${styles[`column_${width}`]} ${
        styles[`columnsm_${smWidth}`]
      } ${styles[`columnmd_${mdWidth}`]} ${styles[`columnlg_${lgWidth}`]} ${
        styles[`columnxl_${xlWidth}`]
      }`}
    >
      {children}
    </div>
  );
}
