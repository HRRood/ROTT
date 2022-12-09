import styles from "../../styles/components/Progressbar/Progressbar.module.css"
import { ProgressbarSubAssignment } from "./ProgressbarSubAssignment";

export function ProgressbarAssignment({assignment}) {
    let subAssignments = [];
    assignment.SubAssignments.forEach(subAssignment => {
        subAssignments.push(<ProgressbarSubAssignment key={subAssignment.Id} finished={subAssignment.Finished}></ProgressbarSubAssignment>)
        
    });

    return (
        <div>
            <div className={styles.progressbar_assignment}>
                {subAssignments}
            </div>
            <div>{assignment.Name}</div>
        </div>
    )
}