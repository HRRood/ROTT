import styles from "../../styles/components/content/Block.module.css";
export function Block({ children, style = {}, classname }) {
  return (
    <div className={`${styles.block} ${classname}`} style={style}>
      {children}
    </div>
  );
}
