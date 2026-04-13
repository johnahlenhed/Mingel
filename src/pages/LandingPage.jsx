import { useState } from "react";
import styles from './LandingPage.module.css'
import { supabase } from '../lib/supabase.js'
import ScrollIndicator from '../components/ScrollIndicator.jsx'
import PuzzlePiece from '../components/register/PuzzlePiece.jsx'
import RoleSelector from '../components/register/RoleSelector.jsx'
import StudentForm from '../components/register/StudentForm.jsx'
import CompanyForm from '../components/register/CompanyForm.jsx'
import { Link } from "react-router-dom";

function LandingPage() {

    const [role, setRole] = useState('company')

    return (
        <main className={styles.registerPage}>

            <div className={styles.textScrollWrapper}>
                <div className={styles.textScrollInner}>
                    <p>YRGO - DIGITAL DESIGN X WEBBUTVECKLING</p>
                    <p>YRGO - DIGITAL DESIGN X WEBBUTVECKLING</p>
                    <p>YRGO - DIGITAL DESIGN X WEBBUTVECKLING</p>
                </div>
            </div>

            <div className={styles.headingWrapper}>
                <p>22 APRIL - VISUAL ARENA</p>
                <h1>NETWORKING</h1>
                <h1>WITH PURPOSE</h1>
            </div>

            <ScrollIndicator />

            <section className={styles.concept}>
                <p className={styles.conceptTitle}>The concept</p>
                <div className={styles.conceptSubtitleWrapper}>
                    <h2 className={styles.conceptSubtitle}>Two parts.</h2>
                    <h2 className={styles.conceptSubtitle}>One connection.</h2>
                </div>
                

                <div className={styles.puzzleWrapper}>
                    <PuzzlePiece text={"Company"} />
                    
                    <div className={styles.puzzlePiece2}>
                        <p>Student</p>
                    </div>
                </div>

                <div className={styles.infoTextWrapper}>
                    <p>Each participant receives a personal digital puzzle piece.</p>
                    <p>No business cards – connect each others puzzle pieces and expand your professional network.</p>
                </div>

                <div className={styles.benefitsWrapper}>
                    <div className={styles.benefits}>
                        <img src="/lightbulb.svg" alt="lightbulb icon" />
                        <p>Get inspired by tomorrow's developers and designers.</p>
                    </div>
                    <div className={styles.benefits}>
                        <img src="/puzzlepiece.svg" alt="puzzle piece icon" />
                        <p>Network with the companies shaping the future.</p>
                    </div>
                    <div className={styles.benefits}>
                        <img src="/handshake.svg" alt="handshake icon" />
                        <p>Find your next hire among job-ready students.</p>
                    </div>
                </div>
            </section>
            <section className={styles.register}>
                <h4>Get started</h4>

                <RoleSelector onSelect={setRole} defaultRole="company" />
                {role === 'company' && <CompanyForm />}
                {role === 'student' && <StudentForm />}
                <Link to="/login" className={styles.loginLink}>
                    I already have an account
                </Link>
            </section>

            
        </main>
    )
}

export default LandingPage