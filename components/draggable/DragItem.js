import { getItemStyle } from "../../pages/assignments/assignment5";

const activities = ["Hond Uitlaten", "Leren", "Uitgaan", "Wandelen", "Winkelen", "Werk", "Sporten", "Koken"];

export default function DragItem({ item, provided, snapshot, setItemData, hoursLeft }) {
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
      <select onChange={handleInputChange} value={item.activityName}>
        <option disabled value="">Kies een activiteit</option>
        {activities.map((activity, index) => (
          <option value={activity} key={index}>
            {activity}
          </option>
        ))}
      </select>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="number"
          value={item.time}
          onChange={(e) => {
            console.log(e.target.value, hoursLeft);
            if (parseFloat(e.target.value || 0) - parseFloat(item.time || 0) > hoursLeft) {
              setItemData({ ...item, time: hoursLeft });
              return;
            }
            setItemData({ ...item, time: e.target.value });
          }}
          style={{ width: "70%" }}
        />{" "}
        <span>Uur</span>
      </div>
    </div>
  );
}
