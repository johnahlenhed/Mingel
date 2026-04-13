import { useState } from "react";
import styles from "./RoleSelector.module.css";

function RoleSelector({ onSelect, defaultRole }) {
  const [selectedRole, setSelectedRole] = useState(defaultRole);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartTime, setTouchStartTime] = useState(null);

  const handleSelect = (role) => {
    setSelectedRole(role);
    onSelect(role);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartTime(Date.now());
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;

    const endX = e.changedTouches[0].clientX;
    const diff = endX - touchStartX;
    const time = Date.now() - touchStartTime;

    const absDiff = Math.abs(diff);
    const velocity = absDiff / time; // px per ms

    const swipeDistance = 40; // px
    const swipeVelocity = 0.3; // px/ms

    const isSwipe = absDiff > swipeDistance || velocity > swipeVelocity;

    if (isSwipe) {
      if (diff > 0) handleSelect("student");
      else handleSelect("company");
    }

    setTouchStartX(null);
    setTouchStartTime(null);
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
