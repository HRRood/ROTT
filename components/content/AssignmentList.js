import { AssignmentCollection } from "../../components/Progress/Data.js";
import styles from "../../styles/components/content/AssignmentList.module.css";

export function AssignmentList() {
  const data = AssignmentCollection;

  let chapters = [];
  for (let i = 0; i < 7; i++) {
    const chapterKey = `chapterKey_${data.AssignmentList[i].Id}`;
    let chapter;
    if (i === 4) {
      chapter = (
        <li key={chapterKey}>
          <a href="/assignments/assignmentweekfifteen">
            {data.AssignmentList[i].Name}
          </a>
        </li>
      );
    } else {
      chapter = <li key={chapterKey}>{data.AssignmentList[i].Name}</li>;
    }
    chapters.push(chapter);
  }

  return <ul className={styles.assignments_list}>{chapters}</ul>;
}
