import Image from "next/image";

import BrandImg from "../../images/logo/logo_ads_ai_no_bg.png";
import ProfileImg from "../../images/profile/profile.png";

import { IoStatsChartOutline } from "react-icons/io5";

import styles from "../../styles/Navigation.module.css";
import Link from "next/link";
import { useUserContext } from "../../context/user";

export default function Navigation() {
  const [user, setUser] = useUserContext();

  return (
    <nav className={styles.navigation}>
      <div className={styles.navigation_container}>
        <div>
          <Link href="/">
            <Image className={styles.navigation_image} src={BrandImg} alt="ADSAI" />
          </Link>
        </div>
        <ul className={styles.navigation_items}>
          {user?.isLoggedIn ? (
            <>
              <li className={`${styles.navigation_icon} ${styles.navigation_item}`}>
                <IoStatsChartOutline size={40} />
              </li>
              <li className={styles.navigation_item}>
                <Image src={ProfileImg} alt="Profil" width={60} />
              </li>
              <li className={styles.navigation_item}>
                <p
                  onClick={() => {
                    fetch("/api/logout")
                      .then((res) => res.json())
                      .then((res) => {
                        if (res.success) {
                          window.location.href = "/login";
                        }
                      });
                  }}
                >
                  Logout
                </p>
              </li>
            </>
          ) : (
            <li className={styles.navigation_item}>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
