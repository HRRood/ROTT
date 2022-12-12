import styles from "../../styles/components/form/Input.module.css";

export default function Input({ label, type, id, name, value, placeholder, onChange, style, classname, required = false, disabled = false }) {
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
        disabled={disabled}
      />
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
