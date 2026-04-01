import styles from './ScrollIndicator.module.css'

function ScrollIndicator() {
    return (
        <div className={styles.scrollIndicator}>
            <img className={styles.arrowDown} src="/arrowdown.svg" alt="down arrow icon" />
            <p>Scroll</p>
        </div>
    )
}

export default ScrollIndicator