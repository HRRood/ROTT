import styles from "../../../styles/components/content/gameObjects/Badge.module.css";
export function Badge({ image }) {
  return (
    <div className={`${styles.Badge}`} style={style}>
      <img src={image} alt={image} />
    </div>
  );
}
