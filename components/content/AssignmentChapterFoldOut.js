import styles from "../../styles/components/content/AssignmentChapterFoldOut.module.css";
import { useState, useEffect } from "react";

export function AssignmentChapterFoldOut({ assignment }) {
  const [isUnfolded, setIsUnfolded] = useState(false);

  useEffect(() => {
    const chapterSubtitleList = document.getElementById(
      `subChapterTitles_${assignment.Id}`
    );
    const chapterTopTitle = document.getElementById(
      `subChapterTop_${assignment.Id}`
    );
    chapterSubtitleList.innerHTML = "";
    chapterTopTitle.className = styles.chapterFoldOutTitle;

    if (isUnfolded) {
      const subChapters = assignment.SubAssignments;
      if (subChapters.length > 0) {
        const containerDiv = document.createElement("div");
        containerDiv.className = styles.subChapterBox;
        containerDiv.id = `ChapterContainerDiv_${assignment.Id}`;
        chapterSubtitleList.appendChild(containerDiv);
        subChapters.forEach((subChapter) => {
          const subChapterTitle = document.createElement("p");
          subChapterTitle.innerText = subChapter.Name;
          subChapterTitle.className = styles.subChapterTitle;
          subChapterTitle.id = `subChapterTitle_${subChapter.Id}`;
          containerDiv.appendChild(subChapterTitle);
        });
        chapterTopTitle.className = styles.chapterTitleUnfolded;
      }
    }
  });

  return (
    <div onClick={() => setIsUnfolded(!isUnfolded)}>
      <div
        id={`subChapterTop_${assignment.Id}`}
        className={styles.chapterFoldOutTitle}
      >
        {assignment.Name}
      </div>
      <div id={`subChapterTitles_${assignment.Id}`}></div>
    </div>
  );
}
