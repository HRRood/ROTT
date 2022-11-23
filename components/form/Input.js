import styles from "../../styles/components/form/Input.module.css";

export default function Input({ label, type, id, name, value, placeholder, onChange, style, classname, required = false }) {
  return (
    <div className={styles.container}>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={style}
        className={`${styles.input} ${classname}`}
        required={required}
      />
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
