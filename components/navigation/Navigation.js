import Image from "next/image";

import BrandImg from "../../images/logo/adsailogo.png";
import ProfileImg from "../../images/profile/profile.png";

import { IoStatsChartOutline } from "react-icons/io5";

import styles from "../../styles/Navigation.module.css";
import Link from "next/link";

export function Navigation() {
  return (
    <nav className={styles.navigation}>
      <div className={styles.navigation_container}>
        <div className={styles.navigation_image}>
          <Link href="/">
            <Image src={BrandImg} alt="ADSAI" width={100} />
          </Link>
        </div>
        <ul className={styles.navigation_items}>
          <li className={`${styles.navigation_icon} ${styles.navigation_item}`}>
            <IoStatsChartOutline size={40} />
          </li>
          <li className={styles.navigation_item}>
            <Image src={ProfileImg} alt="Profil" width={60} />
          </li>
        </ul>
      </div>
    </nav>
  );
}
