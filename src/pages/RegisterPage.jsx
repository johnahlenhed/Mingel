import styles from './RegisterPage.module.css'

function RegisterPage() {
    return (
        <main className={styles.registerPage}>
            <h1>Register for Mingel</h1>
            <form className={styles.registerForm}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />

                <button type="submit">Register</button>
            </form>
        </main>
    )
}

export default RegisterPage