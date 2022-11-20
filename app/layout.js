import { Navigation } from "../components/navigation/Navigation";
import styles from "../styles/Layout.module.css";
import "../styles/globals.css";

export default function Layout({ children }) {
  return (
    <html lang="nl">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        <Navigation />
        <div className={styles.container}>{children}</div>
      </body>
    </html>
  );
}
