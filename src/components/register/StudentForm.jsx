import { useState } from 'react'
import styles from './StudentForm.module.css'
import { supabase } from '../../lib/supabase.js'
import { getUniqueCode } from '../../lib/utils.js'

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

        const code = await getUniqueCode()

        const { data, error: supabaseError } = await supabase
            .from('users')
            .insert({
                ...formData,
                role: 'student',
                code: code
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
            <h1>Get started</h1>
                <form className={styles.registerForm} onSubmit={handleSubmit}>
                    <label htmlFor="full_name">Full name</label>
                    <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required />
            
                    <label htmlFor="programme">Programme</label>
                    <input type="text" id="programme" name="programme" value={formData.programme} onChange={handleChange} required />
            
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                
                    <label htmlFor="link">Link</label>
                    <input type="text" id="link" name="link" value={formData.link} onChange={handleChange} required />
                
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit">Register</button>
                </form>
        </main>
    )
}

export default StudentForm