import { useState } from "react";
import { logout } from "../lib/useUser";
import { useNavigate } from "react-router-dom";
import styles from "./LogoutButton.module.css";

function LogoutButton() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <>
            <button className={styles.logoutTrigger} onClick={() => setIsModalOpen(true)}>
                <img src="/public/logout_icon.svg" alt="Sign Out" />
            </button>

            {isModalOpen && (
                <>
                    <div className={styles.overlay} onClick={() => setIsModalOpen(false)} />
                    <div className={styles.modal}>
                        <div className={styles.handle} />
                        <h2>Feeling done?</h2>
                        <p>Thank you for participating! We hope you had a fun time and are leaving with more knowlage, new connections and a good feeling.</p>
                        <button className={styles.signOutBtn} onClick={handleLogout}>
                            Sign Out
                        </button>
                        <button className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                    </div>
                </>
            )}
        </>  
    )
}

export default LogoutButton;