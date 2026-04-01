import styles from './SelectionButton.module.css'

function SelectionButton({ text, onClick }) {
    return (
        <button className={styles.selectionButton} onClick={onClick}>
            {text}
        </button>
    )
}

export default SelectionButton