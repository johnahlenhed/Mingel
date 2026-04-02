import { useState } from 'react'
import styles from './Form.module.css'
import { supabase } from '../../lib/supabase.js'
import { getUniqueCode, hashPassword } from '../../lib/utils.js'
import RedButton from './RedButton.jsx'
import WhiteButton from './WhiteButton.jsx'

const programmes = [
    'Web Development (WU)',
    'Digital Design (DD)'
]

function StudentForm() {

    const [formData, setFormData] = useState({
        full_name: '',
        programme: '',
        email: '',
        link: ''
    })
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.full_name || !formData.email || !formData.programme || !formData.link) {
            setError('Please fill in all fields')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address')
            return
        }

        setError(null)

        // Generate a unique 4-digit code for the user
        const code = await getUniqueCode()

        // Generate a random 6-digit login code and hash it before storing in the database
        const loginCode = Math.floor(100000 + Math.random() * 900000).toString()
        const hashedLoginCode = await hashPassword(loginCode)

        console.log('Login code:', loginCode) // For testing purposes, log the login code to the console

        const { data, error: supabaseError } = await supabase
            .from('users')
            .insert({
                ...formData,
                role: 'student',
                code: code,
                login_code: hashedLoginCode
            })

        if (supabaseError) {
            console.error('Error inserting data:', supabaseError)
        } else {
            console.log('Data inserted successfully:', data)
            setFormData({
                full_name: '',
                programme: '',
                email: '',
                link: ''
            })
        }
    }

    return (
        <main className={styles.registerPage}>
                <form className={styles.registerForm} onSubmit={handleSubmit}>

                    <div className={styles.inputWrapper}>
                        <label htmlFor="full_name">Full name <span>*</span></label>
                        <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required />
                    </div>

                    <div className={styles.inputWrapper}>
                        <label htmlFor="programme">Programme <span>*</span></label>
                        <select id="programme" name="programme" value={formData.programme} onChange={handleChange} required>
                            <option value="">Select Programme</option>
                            {programmes.map((programme) => (
                                <option key={programme} value={programme}>{programme}</option>
                            ))}
                        </select>
                    </div>
            
                    <div className={styles.inputWrapper}>
                        <label htmlFor="email">Email <span>*</span></label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className={styles.inputWrapper}>
                        <label htmlFor="link">Link <span>*</span></label>
                        <input type="text" id="link" name="link" value={formData.link} onChange={handleChange} required />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}
                    <RedButton type="submit" text="Get started" />
                    <WhiteButton text="Copy link" />
                </form>
        </main>
    )
}

export default StudentForm