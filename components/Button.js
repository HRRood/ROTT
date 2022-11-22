import styles from "../styles/components/Button.module.css";

export default function Button({ type = "primary", text, onClick, style = {}, classname }) {
  return (
    <button className={`${styles.button} ${styles[`button-${type}`]} ${classname}`} style={style} onClick={onClick}>
      {text}
    </button>
  );
}
