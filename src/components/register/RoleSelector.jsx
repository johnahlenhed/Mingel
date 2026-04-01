import { useState } from 'react'
import styles from './RoleSelector.module.css'
import SelectionButton from './SelectionButton.jsx'

function RoleSelector({ onSelect, defaultRole }) {
    const [selectedRole, setSelectedRole] = useState(defaultRole)

    const handleSelect = (role) => {
        setSelectedRole(role)
        onSelect(role)
    }

    return (
        <div className={styles.roleSelector}>
            <SelectionButton text="Company" onClick={() => handleSelect('company')} />
            <SelectionButton text="Student" onClick={() => handleSelect('student')} />
        </div>
    )
}

export default RoleSelector