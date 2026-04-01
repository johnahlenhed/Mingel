import styles from './RedButton.module.css';

function RedButton({ text, icon = "/arrow_right.svg", ...props }) {
    return (
        <button className={styles.redButton} {...props}>
            {text}
            {icon && <img className={styles.arrowIcon} src={icon} alt="" />}
        </button>

    )
}

export default RedButton;