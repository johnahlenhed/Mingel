import { useState } from "react";
import styles from './LandingPage.module.css'
import { supabase } from '../lib/supabase.js'
import RoleSelector from '../components/register/RoleSelector.jsx'
import StudentForm from '../components/register/StudentForm.jsx'
import CompanyForm from '../components/register/CompanyForm.jsx'

function LandingPage() {

    const [role, setRole] = useState(null)

    return (
        <main className={styles.registerPage}>
            <h1>Register for Mingel</h1>
            <RoleSelector onSelect={setRole} />
            {role === 'company' && <CompanyForm />}
            {role === 'student' && <StudentForm />}
        </main>
    )
}

export default LandingPage