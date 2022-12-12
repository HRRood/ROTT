import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DragItem, { activities } from "../../components/draggable/DragItem";
import Button from "../Button";

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
  const [draggableGroupItems, setDraggableGroupItems] = useState([[], [], [], [], [], [], []]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [totalHoursFilled, setTotalHoursFilled] = useState(0);
  const [pointsLogged, setPointsLogged] = useState([]);

  useEffect(() => {
    fetch("/api/assignment/1").then((res) => {
      res.json().then((data) => {
        if (!data.success || !data.data) return;
        const { answer } = data.data;

        setHasSubmitted(true);
        console.log(JSON.parse(answer));
        setDraggableGroupItems(JSON.parse(answer));
      });
    });
  }, []);

  useEffect(() => {
    const totalHoursFilled = draggableGroupItems.reduce((acc, cur) => {
      const totalHours = cur.reduce((acc, cur) => (cur ? acc + parseFloat(cur.time || 0) : 0), 0);
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

  const calculatePoints = () => {
    // group all activities and total time per activity
    const groupedActivities = draggableGroupItems.reduce((acc, cur) => {
      cur.forEach((item) => {
        if (item && item.activityName) {
          const activity = acc.find((a) => a.activityName === item.activityName);
          if (activity) {
            activity.time += parseFloat(item.time);
          } else {
            acc.push({ activityName: item.activityName, time: parseFloat(item.time) });
          }
        }
      });
      return acc;
    }, []);

    const pointsLoggedTemp = [];
    // calculate points per activity
    const totalPoints = groupedActivities.reduce((acc, cur) => {
      const activityData = activities.find((a) => a.value === cur.activityName);
      if (!activityData) return acc;

      if (activityData.type === "neutral") {
        pointsLoggedTemp.push({ activityName: cur.activityName, message: "Geen punten gegeven neutrale activiteit" });
        return acc;
      }

      if (activityData.type === "negative") {
        if (cur.time > activityData.max) {
          pointsLoggedTemp.push({ activityName: cur.activityName, message: "-3 punten, teveel tijd besteed aan activiteit" });
          return acc - 3;
        }

        pointsLoggedTemp.push({ activityName: cur.activityName, message: "Geen punten gegeven, negatieve activiteit" });
        return acc;
      }

      if (activityData.type === "positive") {
        if (cur.time > activityData.max) {
          pointsLoggedTemp.push({ activityName: cur.activityName, message: "-2 punten, te veel tijd besteed aan activiteit" });
          return acc - 2;
        }

        if (cur.time < activityData.min) {
          pointsLoggedTemp.push({ activityName: cur.activityName, message: "-1 punt, te weinig tijd besteed aan activiteit" });
          return acc - 1;
        }

        pointsLoggedTemp.push({ activityName: cur.activityName, message: "+2 puntent, in de tijd vlak dat word verwacht" });
        return acc + 2;
      }
    }, STARTPOINTS);

    setPointsLogged(pointsLoggedTemp);

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

    console.log("rororo TOTALPOINTS", groupedActivities, pointsLoggedTemp, totalPoints);
  };

  return (
    <>
      <ul>
        {pointsLogged.map((item, index) => (
          <li key={index}>
            {item.activityName} - {item.message}
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", margin: "20px 0" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {draggableGroupItems.map((draggableGroupItem, index) => {
            const hasUnfilledHour = draggableGroupItem.some((item) => !item || !item.time || !item.activityName);
            const totalHoursFilled = draggableGroupItem.reduce((acc, cur) => (cur ? acc + parseFloat(cur.time || 0) : 0), 0);

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
                      <p style={{ margin: 0, padding: 0 }}>{hoursLeft} uur intevullen</p>
                    </div>
                    <div style={{ flex: "1" }}>
                      {draggableGroupItem.map((item, itemIndex) => {
                        return (
                          <Draggable key={item.id} draggableId={item.id} index={itemIndex}>
                            {(provided, snapshot) => (
                              <DragItem
                                item={item}
                                hoursLeft={hoursLeft}
                                provided={provided}
                                snapshot={snapshot}
                                setItemData={(data) => setItemInGroup(index, itemIndex, data)}
                                removeFromList={() => removeFromList(index, itemIndex)}
                              />
                            )}
                          </Draggable>
                        );
                      })}
                    </div>
                    {provided.placeholder}
                    {hoursLeft > 0 && !hasUnfilledHour && <button onClick={() => addItemToGivenList(index)}>Add</button>}
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
