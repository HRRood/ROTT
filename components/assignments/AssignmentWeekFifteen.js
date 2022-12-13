import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DragItem, { activities } from "../../components/draggable/DragItem";
import Button from "../Button";
import styles from "../../styles/components/assignments/fifteen.module.css";
import { EXAMPLEDATA } from "../../ERD/assignmentData";

const STARTPOINTS = 10;

const grid = 10;

const days = {
  0: "Maandag",
  1: "Dinsdag",
  2: "Woensdag",
  3: "Donderdag",
  4: "Vrijdag",
  5: "Zaterdag",
  6: "Zondag",
};

export const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  borderRadius: "10px",

  // change background colour if dragging
  background: isDragging
    ? "var(--adsai-medium-blue)"
    : "var(--adsai-light-blue)",
  border: "1px solid var(--adsai-medium-blue)",
  color: "black",
  boxShadow: isDragging ? "rgba(0, 0, 0, 0.5) 0px 3px 12px" : "none",
  position: "relative",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "var(--adsai-light-blue)" : "white",
  padding: grid,
  width: 250,
  color: "var(--adsai-dark-blue)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  textAlign: "center",
  minWidth: "250px",
  flex: 1,
  borderRadius: "10px",
  boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 6px",
  border: "1px solid rgba(0, 0, 0, 0.1)",
});
export function AssignmentWeekFifteen() {
  const [draggableGroupItems, setDraggableGroupItems] = useState(EXAMPLEDATA);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [totalHoursFilled, setTotalHoursFilled] = useState(0);
  const [pointsLogged, setPointsLogged] = useState([]);
  const [totalPointsAssignment, setTotalPointsAssignment] = useState(0);

  useEffect(() => {
    fetch("/api/assignment/1").then((res) => {
      res.json().then((data) => {
        if (!data.success || !data.data) return;
        const { answer, totalPoints } = data.data;

        setHasSubmitted(true);
        const parsedAnswer = JSON.parse(answer);
        setDraggableGroupItems(parsedAnswer);
        setTotalPointsAssignment(totalPoints);

        const groupedItems = groupItems(parsedAnswer);

        const pointsLoggedTemp = [];
        groupedItems.forEach((group) => {
          const activityData = activities.find(
            (a) => a.value === group.activityName
          );

          if (activityData.type === "neutral") {
            pointsLoggedTemp.push({
              activityName: activityData.label,
              score: 0,
              message: "Geen punten gegeven, neutrale activiteit",
            });
            return;
          }

          if (activityData.type === "negative") {
            if (group.time > activityData.max) {
              pointsLoggedTemp.push({
                activityName: activityData.label,
                score: -3,
                message: "Te veel tijd besteed aan de activiteit",
              });
              return;
            }

            pointsLoggedTemp.push({
              activityName: activityData.label,
              score: 0,
              message:
                "Geen punten gegeven, de maximale tijd niet overschreden",
            });
            return;
          }

          if (activityData.type === "positive") {
            if (group.time > activityData.max) {
              pointsLoggedTemp.push({
                activityName: activityData.label,
                score: -1,
                message: "Te veel tijd besteed aan de activiteit",
              });
              return;
            }

            if (group.time < activityData.min) {
              pointsLoggedTemp.push({
                activityName: activityData.label,
                score: -2,
                message: "Te weinig tijd besteed aan activiteit",
              });
              return;
            }

            pointsLoggedTemp.push({
              activityName: activityData.label,
              score: 2,
              message: "Valt binnen de tijdslimiet",
            });
            return;
          }
        });

        setPointsLogged(pointsLoggedTemp);
      });
    });
  }, []);

  useEffect(() => {
    const totalHoursFilled = draggableGroupItems.reduce((acc, cur) => {
      const totalHours = cur.reduce(
        (acc, cur) => (cur ? acc + parseFloat(cur.time || 0) : 0),
        0
      );
      return acc + totalHours;
    }, 0);
    setTotalHoursFilled(totalHoursFilled);
  }, [draggableGroupItems]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const onDragEnd = (result) => {
    if (hasSubmitted) return;
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(
        draggableGroupItems[sInd],
        source.index,
        destination.index
      );
      const newState = [...draggableGroupItems];
      newState[sInd] = items;
      setDraggableGroupItems(newState);
    } else {
      const result = move(
        draggableGroupItems[sInd],
        draggableGroupItems[dInd],
        source,
        destination
      );
      const newState = [...draggableGroupItems];
      newState[sInd] = result[sInd] || [];
      newState[dInd] = result[dInd] || [];

      setDraggableGroupItems(newState);
    }
  };

  const addItemToGivenList = (listIndex) => {
    const newState = [...draggableGroupItems];
    const randString = randomStringGenertor();

    const hasUnfilledHour = newState[listIndex].some((item) => !item.time);
    if (hasUnfilledHour) {
      return;
    }
    newState[listIndex].push({ id: randString, activityName: "", time: "" });
    setDraggableGroupItems(newState);
  };

  const randomStringGenertor = () => {
    return Math.random().toString(36).substring(7);
  };

  const setItemInGroup = (groupIndex, itemIndex, item) => {
    const newState = [...draggableGroupItems];
    newState[groupIndex][itemIndex] = item;
    setDraggableGroupItems(newState);
  };

  const removeFromList = (groupIndex, itemIndex) => {
    const newState = [...draggableGroupItems];
    newState[groupIndex].splice(itemIndex, 1);
    setDraggableGroupItems(newState);
  };

  const groupItems = (arr) => {
    return arr.reduce((acc, cur) => {
      cur.forEach((item) => {
        if (item && item.activityName) {
          const activity = acc.find(
            (a) => a.activityName === item.activityName
          );
          if (activity) {
            activity.time += parseFloat(item.time);
          } else {
            acc.push({
              activityName: item.activityName,
              time: parseFloat(item.time),
            });
          }
        }
      });
      return acc;
    }, []);
  };

  const calculatePoints = () => {
    // group all activities and total time per activity
    const groupedActivities = groupItems(draggableGroupItems);

    const pointsLoggedTemp = [];
    // calculate points per activity
    const totalPoints = groupedActivities.reduce((acc, cur) => {
      const activityData = activities.find((a) => a.value === cur.activityName);
      if (!activityData) return acc;

      if (activityData.type === "neutral") {
        pointsLoggedTemp.push({
          activityName: activityData.label,
          score: 0,
          message: "Geen punten gegeven, neutrale activiteit",
        });
        return acc;
      }

      if (activityData.type === "negative") {
        if (cur.time > activityData.max) {
          pointsLoggedTemp.push({
            activityName: activityData.label,
            score: -3,
            message: "Te veel tijd besteed aan de activiteit",
          });
          return acc - 3;
        }

        pointsLoggedTemp.push({
          activityName: activityData.label,
          score: 0,
          message: "Geen punten gegeven, de maximale tijd niet overschreden",
        });
        return acc;
      }

      if (activityData.type === "positive") {
        if (cur.time > activityData.max) {
          pointsLoggedTemp.push({
            activityName: activityData.label,
            score: -1,
            message: "Te veel tijd besteed aan de activiteit",
          });
          return acc - 1;
        }

        if (cur.time < activityData.min) {
          pointsLoggedTemp.push({
            activityName: activityData.label,
            score: -2,
            message: "Te weinig tijd besteed aan activiteit",
          });
          return acc - 2;
        }

        pointsLoggedTemp.push({
          activityName: activityData.label,
          score: 2,
          message: "Valt binnen de tijdslimiet",
        });
        return acc + 2;
      }
    }, STARTPOINTS);

    setPointsLogged(pointsLoggedTemp);
    setTotalPointsAssignment(totalPoints);

    fetch("/api/assignment/submit/1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assignmentAnswer: draggableGroupItems,
        poinstGiven: totalPoints,
      }),
    }).then((res) => {
      console.log("res", res);
      setHasSubmitted(true);
    });
  };

  const setResultDivClass = (numPoints) => {
    if (numPoints >= STARTPOINTS) {
      return `${styles.alert} ${styles.alert_success}`;
    } else {
      return `${styles.alert} ${styles.alert_fail}`;
    }
  };

  const setResultTableDivClass = (numPoints) => {
    if (numPoints >= STARTPOINTS) {
      return `${styles.result_table_container} ${styles.result_table_container_success}`;
    } else {
      return `${styles.result_table_container} ${styles.result_table_container_fail}`;
    }
  };

  const setTableClass = (numPoints) => {
    if (numPoints >= STARTPOINTS) {
      return `${styles.result_table} ${styles.result_table_success}`;
    } else {
      return `${styles.result_table} ${styles.result_table_fail}`;
    }
  };

  const showResultsTable = (hasSubmitted) => {
    if (hasSubmitted === true) {
      return `${styles.result_container}`;
    } else {
      return `${styles.result_container_hidden}`;
    }
  };

  return (
    <>
      <div className={showResultsTable(hasSubmitted)}>
        <div>
          {hasSubmitted && (
            <div className={setResultDivClass(totalPointsAssignment)}>
              <span>
                Je hebt <strong>{totalPointsAssignment}</strong> punten gekregen
                voor de opdracht. Dit is{" "}
                <strong>
                  {totalPointsAssignment >= STARTPOINTS
                    ? "voldoende"
                    : "onvoldoende"}
                </strong>
                .&nbsp;
              </span>

              {totalPointsAssignment < STARTPOINTS && (
                <span>
                  Je planning kan beter. Je komt{" "}
                  <strong>{STARTPOINTS - totalPointsAssignment}</strong> punten
                  tekort. Zie je verbeterpunten?
                </span>
              )}
              {totalPointsAssignment >= STARTPOINTS && (
                <span>
                  Je planning is goed! Je hebt de juiste hoeveelheid tijd
                  besteed aan de activiteiten.
                </span>
              )}
            </div>
          )}
        </div>
        <div className={setResultTableDivClass(totalPointsAssignment)}>
          {pointsLogged.length > 0 && (
            <div>
              <table className={setTableClass(totalPointsAssignment)}>
                <tr>
                  <th>Activiteit</th>
                  <th>Score</th>
                  <th>Toelichting</th>
                </tr>
                {pointsLogged.map((item, index) => (
                  <tr key={index}>
                    <td>{item.activityName}</td>
                    <td>{item.score}</td>
                    <td>{item.message}</td>
                  </tr>
                ))}
              </table>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          margin: "20px 0",
        }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {draggableGroupItems.map((draggableGroupItem, index) => {
            const hasUnfilledHour = draggableGroupItem.some(
              (item) => !item || !item.time || !item.activityName
            );
            const totalHoursFilled = draggableGroupItem.reduce(
              (acc, cur) => (cur ? acc + parseFloat(cur.time || 0) : 0),
              0
            );

            const hoursLeft = 10 - totalHoursFilled;
            return (
              <Droppable droppableId={index.toString()} key={index}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      ...getListStyle(snapshot.isDraggingOver),
                    }}
                  >
                    <div style={{ margin: "5px" }}>
                      <h3 style={{ margin: 0, padding: 0 }}>{days[index]}</h3>
                      <p style={{ margin: 0, padding: 0 }}>
                        {hoursLeft} uur in te plannen
                      </p>
                    </div>
                    <div style={{ flex: "1" }}>
                      {draggableGroupItem.map((item, itemIndex) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={itemIndex}
                          >
                            {(provided, snapshot) => (
                              <DragItem
                                item={item}
                                hoursLeft={hoursLeft}
                                provided={provided}
                                snapshot={snapshot}
                                setItemData={(data) =>
                                  setItemInGroup(index, itemIndex, data)
                                }
                                removeFromList={() =>
                                  removeFromList(index, itemIndex)
                                }
                                hasSubmitted={hasSubmitted}
                              />
                            )}
                          </Draggable>
                        );
                      })}
                    </div>
                    {provided.placeholder}
                    {hoursLeft > 0 && !hasUnfilledHour && (
                      <button onClick={() => addItemToGivenList(index)}>
                        Add
                      </button>
                    )}
                  </div>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>

      {totalHoursFilled >= 70 && !hasSubmitted && (
        <div style={{ margin: "10px 0" }}>
          <Button text="Submit" onClick={calculatePoints} />
        </div>
      )}
    </>
  );
}
