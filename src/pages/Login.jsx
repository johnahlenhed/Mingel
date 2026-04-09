import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { verifyPassword } from "../lib/utils";
import RedButton from "../components/register/RedButton";
import styles from "./Login.module.css";
import { useUser } from "../lib/useUser";
import { useEventStatus } from "../lib/useEventStatus";


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        code: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const user = useUser()
    const eventActive = useEventStatus()

    if (user && eventActive !== null) {
        return <Navigate to={eventActive ? '/' : '/lobby'} />
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Fetch user by email
        const { data, error: supabaseError } = await supabase
            .from('users')
            .select('*')
            .eq('email', formData.email)
            .single()

        if (supabaseError || !data) {
            setError('Invalid email or password')
            return
        }

        // Verify login code
        const isValid = await verifyPassword(formData.code, data.login_code)

        if (!isValid) {
            setError('Incorrect password')
            return
        }

        // Save user to local storage
        localStorage.setItem('user', JSON.stringify(data))

        // Redirect to home page
        navigate(eventActive ? '/' : '/lobby')
    }


    return (
        <main className={styles.loginPage}>

            <section className={styles.loginWrapper}>

                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="email">Mail</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/>
                    </div>

                    <div className={styles.inputWrapper}>
                        <label htmlFor="code">Password</label>
                        <input type="text" id="code" name="code" value={formData.code} onChange={handleChange} required/>
                    </div>
                
                    {error && <p className={styles.error}>{error}</p>}

                    <div className={styles.informationWrapper}>
                        <img src="/information_icon.svg" alt="information icon" />
                        <p>You’ve received your password in a mail</p>
                    </div>

                    <div className={styles.buttonWrapper}>
                        <RedButton type="submit" text="Sign in" />

                        <Link to="/register" className={styles.registerLink}>Create account</Link>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Login;