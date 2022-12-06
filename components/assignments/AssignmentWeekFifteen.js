import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DragItem from "../../components/draggable/DragItem";

const grid = 8;

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

  // change background colour if dragging
  background: isDragging ? "#CCDC9F" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#dedede" : "lightgrey",
  padding: grid,
  width: 250,
});
export function AssignmentWeekFifteen() {
  const [draggableGroupItems, setDraggableGroupItems] = useState([[], [], [], [], [], [], []]);

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

    console.log(source, destination);

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(draggableGroupItems[sInd], source.index, destination.index);
      const newState = [...draggableGroupItems];
      newState[sInd] = items;
      setDraggableGroupItems(newState);
    } else {
      const result = move(draggableGroupItems[sInd], draggableGroupItems[dInd], source, destination);
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

  return (
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
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <div style={{ margin: "5px" }}>
                  <h3 style={{ margin: 0, padding: 0 }}>{days[index]}</h3>
                  <p style={{ margin: 0, padding: 0 }}>{hoursLeft} uur intevullen</p>
                </div>
                <div style={{ flex: "1" }}>
                  {draggableGroupItem.map((item, itemIndex) => {
                    return (
                      <Draggable key={item.id} draggableId={item.id} index={item.id}>
                        {(provided, snapshot) => (
                          <DragItem
                            item={item}
                            hoursLeft={hoursLeft}
                            provided={provided}
                            snapshot={snapshot}
                            setItemData={(data) => setItemInGroup(index, itemIndex, data)}
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
  );
}
