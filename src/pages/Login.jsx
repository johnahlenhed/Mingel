import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { hashPassword, verifyPassword } from "../lib/utils";
import RedButton from "../components/register/RedButton";
import styles from "./Login.module.css";
import { useUser } from "../lib/useUser";
import { useEventStatus } from "../lib/useEventStatus";
import { sendLoginEmail } from "../lib/sendEmail";


function Login() {
    const [showResend, setShowResend] = useState(false)
    const [resendEmail, setResendEmail] = useState('')
    const [resendStatus, setResendStatus] = useState(null)

    const handleResend = async (e) => {
        e.preventDefault()

        // Check if email exists
        const { data, error } = await supabase
            .from('users')
            .select('id')
            .eq('email', resendEmail)
            .single()

        if (error || !data) {
            setResendStatus('Email not found')
            return
        }

        // Generate new login code
        const loginCode = Math.floor(100000 + Math.random() * 900000).toString()
        const hashedLoginCode = await hashPassword(loginCode)

        // Update the database
        await supabase
            .from('users')
            .update({ login_code: hashedLoginCode })
            .eq('id', data.id)

        // Send email with new login code (this is a placeholder, implement your email sending logic here)
        await sendLoginEmail(resendEmail, loginCode)
        setResendStatus('New login code has been sent to your email')

        setTimeout(() => {
            setShowResend(false)
            setResendStatus(null)
            setResendEmail('')
        }, 2000)
    }

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

                        <p className={styles.resendLink} onClick={() => setShowResend(true)}>
                            I've lost my password
                        </p>

                        <div className={styles.divider} />

                        <Link to="/register" className={styles.registerLink}>Create account</Link>
                    </div>
                </form>

                

                {showResend && (
                    <>
                        <div className={styles.overlay} onClick={() => setShowResend(false)} />
                        <div className={styles.modal}>
                            <div className={styles.handle} />
                            <h2>Lost your password?</h2>
                            <p>Enter your email and we'll send you a new login code.</p>
                            <form onSubmit={handleResend}>
                                <input
                                    className={styles.modalInput}
                                    type="email"
                                    placeholder="Enter your email"
                                    value={resendEmail}
                                    onChange={(e) => setResendEmail(e.target.value)}
                                    required
                                />
                                {resendStatus && <p className={styles.resendStatus}>{resendStatus}</p>}
                                <button className={styles.sendBtn} type="submit">Send new code</button>
                                <button className={styles.cancelBtn} type="button" onClick={() => setShowResend(false)}>Cancel</button>
                            </form>
                        </div>
                    </>
                )}
            </section>
        </main>
    )
}

export default Login;