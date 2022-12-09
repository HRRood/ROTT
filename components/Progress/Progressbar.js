import { AssignmentCollection } from "./Data";
import { ProgressbarAssignment } from "./ProgressbarAssignment";
import styles from "../../styles/components/Progress/Progressbar.module.css";

export function Progressbar() {
  let assignments = [];
  AssignmentCollection.AssignmentList.forEach((assignment) => {
    const assignmentKey = `assignment_${assignment.Id}`;
    assignments.push(
      <ProgressbarAssignment
        key={assignmentKey}
        assignment={assignment}
      ></ProgressbarAssignment>
    );
  });

  return <div className={styles.progressbar}>{assignments}</div>;
}
