import styles from "../../styles/components/content/gameObjects/ScoreNumber.module.css";

export function ScoreNumber({ score, unit }) {
  return (
    <div className={styles.scorenumberDiv}>
      <p className={styles.scorenumberContent}>{score}</p>
      <p className={styles.scorenumberUnit}>{unit}</p>
    </div>
  );
}
