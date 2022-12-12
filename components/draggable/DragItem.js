import { getItemStyle } from "../assignments/AssignmentWeekFifteen";
import Select from "react-select";

import styles from "../../styles/components/draggable/DragItem.module.css";
import Input from "../form/Input";

export const activities = [
  {
    value: "leren",
    label: "Leren",
    type: "positive",
    min: 10,
    max: 20,
  },
  {
    value: "school",
    label: "School",
    type: "neutral",
  },
  {
    value: "werk",
    label: "Werk",
    type: "neutral",
  },
  {
    value: "sport",
    label: "Sport",
    type: "positive",
    min: 0,
    max: 10,
  },
  {
    value: "uitgaan",
    label: "Uitgaan",
    type: "negative",
    max: 10,
  },
  {
    value: "ontspanning",
    label: "Ontspanning",
    type: "positive",
    min: 10,
    max: 20,
  },
  {
    value: "reistijd",
    label: "Reistijd",
    type: "neutral",
  },
  {
    value: "winkelen",
    label: "Winkelen",
    type: "negative",
    max: 10,
  },
  {
    value: "huisdieren-verzorgen",
    label: "Huisdieren verzorgen",
    type: "neutral",
  },
  {
    value: "huishouden-koken",
    label: "Huishouden, koken",
    type: "neutral",
  },
];

export default function DragItem({ item, provided, snapshot, setItemData, hoursLeft, removeFromList, hasSubmitted }) {
  const handleInputChange = (obj) => {
    if (obj === null) return setItemData({ ...item, activityName: item.activityName });
    const { value } = obj;
    setItemData({ ...item, activityName: value });
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      {!hasSubmitted && (
        <div style={{ position: "absolute", top: "5px", right: "5px", color: "white", cursor: "pointer" }} onClick={() => removeFromList()}>
          x
        </div>
      )}
      <div>
        <Select
          options={activities}
          defaultValue={activities.find((activity) => activity.value === item.activityName)}
          isClearable={true}
          name="activity"
          isSearchable={true}
          placeholder="Activiteit"
          onChange={handleInputChange}
          isDisabled={hasSubmitted}
        />
      </div>

      <div className={styles.inputcontainer}>
        <Input
          type="string"
          label="Aantal uur"
          value={item.time}
          classname={styles.input}
          disabled={hasSubmitted}
          onChange={(e) => {
            if (parseFloat(e.target.value || 0) < 0) return;
            if (parseFloat(e.target.value || 0) - parseFloat(item.time || 0) > hoursLeft) return;

            setItemData({ ...item, time: e.target.value.replace(/\D/g, "") });
          }}
        />
      </div>
    </div>
  );
}
