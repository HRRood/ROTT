import styles from "../../styles/components/Progressbar/ProgressBar.module.css";

export function ProgressbarSubAssignment({finished}){
    let bullet = [];
    if (finished === true){
        bullet.push(<div className={styles.progressbar_sub_assignment_true}>&#183;</div>)
    } else {
        bullet.push(<div className={styles.progressbar_sub_assignment_false}>&#183;</div>)
    }

    return (
        <div>{bullet}</div>
    );
}