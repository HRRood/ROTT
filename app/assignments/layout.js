import { Block } from "../../components/content/Block";
import { Column } from "../../components/content/Column";
import { Row } from "../../components/content/Row";
import styles from "../../styles/pages/Assignments.module.css";

export default function Page({ children }) {
  return (
    <>
      <Row>
        <Column width={20}>
          <Block>
            <ul className={styles.assignments_list}>
              <li>Leren leren</li>
              <li>Samenwerken</li>
              <li>Communiceren</li>
              <li>Methodisch werken</li>
              <li>Prioriteiten stellen</li>
              <li>Plannen</li>
              <li>Taalvaardigheid</li>
            </ul>
          </Block>
        </Column>
        <Column width={80}>
          <Block>{children}</Block>
        </Column>
      </Row>
    </>
  );
}
