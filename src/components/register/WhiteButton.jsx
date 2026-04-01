import styles from './WhiteButton.module.css';

function WhiteButton({ text, icon = "/copy_icon.svg", ...props }) {
    return (
        <button className={styles.whiteButton} {...props}>
            {text}
            {icon && <img className={styles.arrowIcon} src={icon} alt="" />}
        </button>

    )
}

export default WhiteButton;