import styles from './PuzzlePiece.module.css'

function PuzzlePiece({ text }) {
    return (
        <div className={styles.puzzlePiece}>
            <p>{text}</p>
            <div className={styles.puzzleTab}></div>
        </div>
    )
}

export default PuzzlePiece