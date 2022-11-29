import Link from "next/link";
import { Block } from "../components/content/Block";
import { Column } from "../components/content/Column";
import { InfoBlock } from "../components/content/InfoBlock";
import { Row } from "../components/content/Row";
import { getTimePartOfDay } from "../utils/get-time-part-of-day";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import { useEffect } from "react";
import { useUserContext } from "../context/user";
import { getUserById, mapUserData } from "./api/user/[id]";

import styles from "../styles/Home.module.css";
import isUserLoggedIn from "../utils/is-user-logged-in";

export default function Home({ userData }) {
  const [user, setUser] = useUserContext();

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return (
    <div className={styles.container}>
      <Row>
        <Column width={100} smWidth={50} lgWidth={70}>
          <Block>
            <p className={styles.title}>
              {getTimePartOfDay()} {user?.Username}
            </p>
            <Row>
              <Column width={100}>
                <Link href="/">
                  <InfoBlock type="brand">
                    <p>Ga verder met</p>
                    <p>Hoofdstuk 5.2: Covey’s Time Management Matrix</p>
                  </InfoBlock>
                </Link>
              </Column>

              <Column width={100}>
                <Link href="/">
                  <InfoBlock type="error">
                    <p>Volgende deadline</p>
                    <p>Deze week, Hoofdstuk 6: Plannen</p>
                  </InfoBlock>
                </Link>
              </Column>
            </Row>
          </Block>
        </Column>
        <Column width={100} smWidth={50} lgWidth={30}>
          <Block>
            <p className={styles.title}>Opdrachten</p>
            <ul className={styles.assignments_list}>
              <li>Hoofdstuk 1 - Leren leren</li>
              <li>Hoofdstuk 2 - Samenwerken</li>
              <li>Hoofdstuk 3 - Communiceren</li>
              <li>Hoofdstuk 4 - Methodisch werken</li>
              <li>Hoofdstuk 5 - Prioriteiten stellen</li>
              <li>Hoofdstuk 6 - Plannen</li>
              <li>Hoofdstuk 7 - Taalvaardigheid</li>
            </ul>
          </Block>
        </Column>
      </Row>

      <Row>
        <Column width={100}>
          <Block>
            <p className={styles.title}>Progress</p>
          </Block>
        </Column>
      </Row>

      <Row>
        <Column width={25}>
          <Block>
            <p className={styles.title}>Assignment Streaks</p>
            <p>{user?.AssignmentStreak}</p>
          </Block>
        </Column>
        <Column width={25}>
          <Block>
            <p className={styles.title}>Logged in Streaks</p>
            <p>{user?.LoginStreak}</p>
          </Block>
        </Column>
        <Column width={25}>
          <Block>
            <p className={styles.title}>Points</p>
            <p>{user?.Points}</p>
          </Block>
        </Column>
        <Column width={25}>
          <Block>
            <p className={styles.title}>Recente badges</p>
          </Block>
        </Column>
      </Row>
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  if (!isUserLoggedIn(req)) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        userData: { isLoggedIn: false, login: "", avatarUrl: "" },
      },
    };
  }

  const response = await getUserById(req.session.user.Id);

  if (!response.success) {
    return {
      props: {
        userData: { isLoggedIn: false, login: "", avatarUrl: "" },
      },
    };
  }

  const userMapped = mapUserData(response.data);
  return {
    props: { userData: { ...req.session.user, ...userMapped } },
  };
}, sessionOptions);
