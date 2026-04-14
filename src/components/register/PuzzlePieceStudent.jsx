import styles from './PuzzlePieceStudent.module.css'

function PuzzlePieceStudent({ text }) {
    return (
        <div className={styles.puzzlePiece}>
            <p>{text}</p>
            <div className={styles.puzzleTab}></div>
        </div>
    )
}

export default PuzzlePieceStudent