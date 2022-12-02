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
import { ColumnGrid } from "../components/content/ColumnGrid";
import { Badge } from "../components/content/Badge";
import badge1 from "../images/gamification_icons/badge1.png";
import badge2 from "../images/gamification_icons/badge2.png";
import badge3 from "../images/gamification_icons/badge3.png";
import badge4 from "../images/gamification_icons/badge4.png";
import { ScoreNumber } from "../components/content/ScoreNumber";

export default function Home({ userData }) {
  const [user, setUser] = useUserContext();

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return (
    <div className={styles.container}>
      <Row>
        {/* Badges, streak, score */}
        <ColumnGrid width={100} smWidth={33} lgWidth={20}>
          <Block>
            <p className={styles.sub_title}>Badges</p>
            <div className={styles.badgeGrid}>
              <Badge image={badge1} />
              <Badge image={badge2} />
              <Badge image={badge3} />
              <Badge image={badge4} />
            </div>
          </Block>

          <Block>
            <p className={styles.sub_title}>Punten</p>
            <ScoreNumber score={user?.Points} unit={""}></ScoreNumber>
          </Block>

          <Block>
            <p className={styles.sub_title}>Opdracht Streak</p>
            <ScoreNumber score={user?.AssignmentStreak} unit={""}></ScoreNumber>
          </Block>
        </ColumnGrid>

        {/* Center block */}
        <Column width={100} smWidth={33} lgWidth={50}>
          <Block>
            <p className={styles.title}>
              {getTimePartOfDay()} {user?.Username}!
            </p>
            <Row>
              <Column width={100}>
                <Link href="/">
                  <InfoBlock type="brand">
                    <p className={styles.sub_title}>Ga verder met</p>
                    <p>Hoofdstuk 5.2: Covey’s Time Management Matrix</p>
                  </InfoBlock>
                </Link>
              </Column>

              <Column width={100}>
                <Link href="/">
                  <InfoBlock type="error">
                    <p className={styles.sub_title}>Volgende deadline</p>
                    <p>Deze week, Hoofdstuk 6: Plannen</p>
                  </InfoBlock>
                </Link>
              </Column>
            </Row>
          </Block>
        </Column>

        {/* Assignment list */}
        <Column width={100} smWidth={33} lgWidth={30}>
          <Block>
            <p className={styles.sub_title}>Opdrachten</p>
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
        <ColumnGrid width={100} smWidth={33} lgWidth={20}>
          <Block>
            <p className={styles.sub_title}>Login Streak</p>
            <ScoreNumber score={user?.LoginStreak} unit={"weken"}></ScoreNumber>
          </Block>
        </ColumnGrid>
        <Column width={100} smWidth={67} lgWidth={80}>
          <Block>
            <p className={styles.sub_title}>Voortgang</p>
          </Block>
        </Column>
      </Row>
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
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
},
sessionOptions);
