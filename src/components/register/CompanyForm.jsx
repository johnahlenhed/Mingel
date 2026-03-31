import { useState } from 'react'
import styles from './CompanyForm.module.css'
import { supabase } from '../../lib/supabase.js'
import { getUniqueCode } from '../../lib/utils.js'

function CompanyForm() {

    const [formData, setFormData] = useState({
        full_name: '',
        company: '',
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

        if (!formData.full_name || !formData.email || !formData.company || !formData.link) {
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
                role: 'company',
                code: code
            })

        if (supabaseError) {
            console.error('Error inserting data:', supabaseError)
        } else {
            console.log('Data inserted successfully:', data)
            setFormData({
                full_name: '',
                company: '',
                email: '',
                link: ''
            })
        }
    }

    return (
        <main className={styles.registerPage}>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
                <label htmlFor="full_name">Full name</label>
                <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required />

                <label htmlFor="company">Company</label>
                <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required />

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

export default CompanyForm