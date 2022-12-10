import Image from "next/image";
import styles from "../../styles/components/content/gameObjects/Badge.module.css";
export function Badge({ image }) {
  return (
    <div className={styles.badge}>
      <Image
        className={styles.badge_image}
        src={image}
        fill
        sizes="(max-width:278px) 100vw"
        alt="badge"
      />
    </div>
  );
}
