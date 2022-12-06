import { getItemStyle } from "../assignments/AssignmentWeekFifteen";
import Select from "react-select";

import styles from "../../styles/components/draggable/DragItem.module.css";
import Input from "../form/Input";

const activities = [
  {
    value: "leren",
    label: "Leren",
  },
  {
    value: "school",
    label: "School",
  },
  {
    value: "werk",
    label: "Werk",
  },
  {
    value: "sport",
    label: "Sport",
  },
  {
    value: "uitgaan",
    label: "Uitgaan",
  },
  {
    value: "ontspanning",
    label: "Ontspanning",
  },
  {
    value: "reistijd",
    label: "Reistijd",
  },
  {
    value: "winkelen",
    label: "Winkelen",
  },
  {
    value: "huisdieren-verzorgen",
    label: "Huisdieren verzorgen",
  },
  {
    value: "Huishouden-koken",
    label: "Huishouden, koken",
  },
];

export default function DragItem({ item, provided, snapshot, setItemData, hoursLeft }) {
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
      <div>
        {console.log(item)}
        <Select
          options={activities}
          defaultValue={activities.find((activity) => activity.value === item.activityName)}
          isClearable={true}
          name="activity"
          isSearchable={true}
          placeholder="Activiteit"
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.inputcontainer}>
        <Input
          type="string"
          label="Aantal uur"
          value={item.time}
          classname={styles.input}
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
