import styles from "./SelectionButton.module.css";

function SelectionButton({ text, onClick, isSelected, position }) {
  return (
    <button
      className={[
        styles.selectionButton,
        isSelected ? styles.selected : "",
        position === "left" ? styles.left : "",
        position === "right" ? styles.right : "",
      ].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default SelectionButton;
