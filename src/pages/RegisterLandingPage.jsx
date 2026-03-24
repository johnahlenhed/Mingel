import { Link } from 'react-router-dom'
import styles from './RegisterLandingPage.module.css'

function RegisterLandingPage() {
    return (
        <main className={styles.landingPage}>
            <h1>Welcome to Mingel!</h1>
            <Link to="/register" className={styles.registerButton}>
                Get Started
            </Link>
        </main>
    )
}

export default RegisterLandingPage