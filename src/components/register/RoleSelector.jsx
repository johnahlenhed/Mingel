import { useState } from "react";
import styles from "./RoleSelector.module.css";

function RoleSelector({ onSelect, defaultRole }) {
  const [selectedRole, setSelectedRole] = useState(defaultRole);
  const [touchStartX, setTouchStartX] = useState(null);

  const handleSelect = (role) => {
    setSelectedRole(role);
    onSelect(role);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;

    const diff = e.changedTouches[0].clientX - touchStartX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) handleSelect("company");
      else handleSelect("student");
    }

    setTouchStartX(null);
  };

  return (
    <div
      className={styles.segmented}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`${styles.slider} ${
          selectedRole === "company" ? styles.left : styles.right
        }`}
      />

      <button
        className={`${styles.label} ${
          selectedRole === "company" ? styles.active : ""
        }`}
        onClick={() => handleSelect("company")}
      >
        Company
      </button>

      <button
        className={`${styles.label} ${
          selectedRole === "student" ? styles.active : ""
        }`}
        onClick={() => handleSelect("student")}
      >
        Student
      </button>
    </div>
  );
}

export default RoleSelector;
