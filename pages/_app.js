import Navigation from "../components/navigation/Navigation";
import styles from "../styles/Layout.module.css";
import "../styles/globals.css";
import { UserProvider } from "../context/user";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Navigation />
      <div className={styles.container}>
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}

export default MyApp;
