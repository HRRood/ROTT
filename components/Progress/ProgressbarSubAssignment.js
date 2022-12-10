import styles from "../../styles/components/Progress/Progressbar.module.css";

export function ProgressbarSubAssignment({ subAssignment }) {
  const subAssignmentKey = `bullet_${subAssignment.Id}`;
  let bullet = [];
  if (subAssignment.Finished === true) {
    bullet.push(
      <div
        key={subAssignmentKey}
        className={styles.progressbar_sub_assignment_true}
      >
        &#183;
      </div>
    );
  } else {
    bullet.push(
      <div
        key={subAssignmentKey}
        className={styles.progressbar_sub_assignment_false}
      >
        &#183;
      </div>
    );
  }

  return <div>{bullet}</div>;
}
