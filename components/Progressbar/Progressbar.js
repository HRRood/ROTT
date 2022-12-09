import { AssignmentCollection } from "./Data";
import { ProgressbarAssignment } from "./ProgressbarAssignment";
import styles from "../../styles/components/Progressbar/ProgressBar.module.css"

export function Progressbar() {
    let assignments = [];
    AssignmentCollection.AssignmentList.forEach(assignment => {
        assignments.push(
            <ProgressbarAssignment key={assignment.Id} assignment={assignment}></ProgressbarAssignment>
        );
    });

    return (
        <div className={styles.progressbar}>
            {assignments}
        </div>
    );
}