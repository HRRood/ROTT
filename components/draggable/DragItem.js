import { getItemStyle } from "../../pages/assignments/assignment5";

const activities = ["Hond Uitlaten", "Leren", "Uitgaan", "Wandelen", "Winkelen", "Werk", "Sporten", "Koken"];

export default function DragItem({ item, provided, snapshot, setItemData }) {
  const handleInputChange = (e) => {
    const { value } = e.target;
    setItemData({ ...item, activityName: value });
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      <select onChange={handleInputChange}>
        <option selected disabled>
          Kies een activiteit
        </option>
        {activities.map((activity) => (
          <option selected={item.activityName === activity} value={activity}>
            {activity}
          </option>
        ))}
      </select>
      <div style={{ display: "flex", gap: "10px" }}>
        <input type="number" value={item.time} onChange={(e) => setItemData({ ...item, time: e.target.value })} style={{width: "70%"}} /> <span>Uur</span>
      </div>
    </div>
  );
}
