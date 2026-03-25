import { useState } from "react";
import styles from './RegisterPage.module.css'
import { supabase } from '../lib/supabase.js'

function RegisterPage() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { data, error } = await supabase 
            .from('Test_table')
            .insert(formData)

        if (error) {
            console.error('Error registering user:', error)
        } else {
            console.log('User registered successfully:', data)
        }
    }

    return (
        <main className={styles.registerPage} onSubmit={handleSubmit}>
            <h1>Register for Mingel</h1>
            <form className={styles.registerForm}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

                <button type="submit">Register</button>
            </form>
        </main>
    )
}

export default RegisterPage