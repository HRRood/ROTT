import Link from "next/link";
import { Block } from "../components/content/Block";
import { Column } from "../components/content/Column";
import { InfoBlock } from "../components/content/InfoBlock";
import { Row } from "../components/content/Row";
import styles from "../styles/Home.module.css";
import { getTimePartOfDay } from "../utils/get-time-part-of-day";

export default function Page() {
  return (
    <div className={styles.container}>
      <Row>
        <Column width={100} smWidth={50} lgWidth={70}>
          <Block>
            <p className={styles.title}>{getTimePartOfDay()} Username</p>
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
        <Column width={33}>
          <Block>
            <p className={styles.title}>Streaks</p>
            <p>4</p>
          </Block>
        </Column>
        <Column width={33}>
          <Block>
            <p className={styles.title}>Points</p>
            <p>138</p>
          </Block>
        </Column>
        <Column width={33}>
          <Block>
            <p className={styles.title}>Recente badges</p>
          </Block>
        </Column>
      </Row>
    </div>
  );
}
