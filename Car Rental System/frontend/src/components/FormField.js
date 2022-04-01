import React from "react";
import styles from "../css/FormField.module.css";

export default function FormField({ type, name, value, handleChange }) {
  return (
    <section className={styles.inputContainer}>
      <label htmlFor={name}>{name}</label>
      <input type={type} name={name} value={value} onChange={handleChange} />
    </section>
  );
}
