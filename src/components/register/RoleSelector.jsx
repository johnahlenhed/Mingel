import { useState } from 'react'
import styles from './RoleSelector.module.css'
import { supabase } from '../../lib/supabase.js'

function RoleSelector({ onSelect }) {
    return (
        <div className={styles.roleSelector}>
            <button onClick={() => onSelect('student')}>Student</button>
            <button onClick={() => onSelect('company')}>Company</button>
        </div>
    )
}

export default RoleSelector