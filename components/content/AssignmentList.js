import { AssignmentCollection } from "../../components/Progress/Data.js";
import styles from "../../styles/components/content/AssignmentList.module.css";

export function AssignmentList() {
  const data = AssignmentCollection;

  let chapters = [];
  for (let i = 0; i < 7; i++) {
    let chapter;
    if (i === 4) {
      chapter = (
        <li>
          <a href="/assignments/assignmentweekfifteen">
            {data.AssignmentList[i].Name}
          </a>
        </li>
      );
    } else {
      chapter = <li>{data.AssignmentList[i].Name}</li>;
    }
    chapters.push(chapter);
  }

  return <ul className={styles.assignments_list}>{chapters}</ul>;
}
