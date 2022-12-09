import styles from "../../styles/components/Progress/Progressbar.module.css";
import { ProgressbarSubAssignment } from "./ProgressbarSubAssignment";

export function ProgressbarAssignment({ assignment }) {
  let subAssignments = [];
  assignment.SubAssignments.forEach((subAssignment) => {
    const subAssignmentKey = `subAssignmentKey_${subAssignment.Id}`;
    subAssignments.push(
      <ProgressbarSubAssignment
        key={subAssignmentKey}
        subAssignment={subAssignment}
      ></ProgressbarSubAssignment>
    );
  });

  return (
    <div>
      <div className={styles.progressbar_assignment}>{subAssignments}</div>
      <div className={styles.progressbar_title}>{assignment.Period}</div>
    </div>
  );
}
