import { useEffect, useState } from "react";
import styles from './LandingPage.module.css'
import { supabase } from '../lib/supabase.js'
import ScrollIndicator from '../components/ScrollIndicator.jsx'
import PuzzlePiece from '../components/register/PuzzlePiece.jsx'
import PuzzlePieceStudent from '../components/register/PuzzlePieceStudent.jsx'
import RoleSelector from '../components/register/RoleSelector.jsx'
import StudentForm from '../components/register/StudentForm.jsx'
import CompanyForm from '../components/register/CompanyForm.jsx'
import { Link } from "react-router-dom";
import AddToCalendar from "../components/AddToCalendar.jsx";

function LandingPage() {

    const [role, setRole] = useState('company')

    useEffect(() => {
        document.body.classList.add('register-page')
        return () => document.body.classList.remove('register-page')
    }, [])

    return (
        <main className={styles.registerPage}>

            <div className={styles.textScrollWrapper}>
                {/* Not optimal solution but it works for now */}
                <div className={styles.textScrollInner}>
                    <p>YRGO - DIGITAL DESIGN X WEBBUTVECKLING</p>
                    <p>YRGO - DIGITAL DESIGN X WEBBUTVECKLING</p>
                    <p>YRGO - DIGITAL DESIGN X WEBBUTVECKLING</p>
                    <p>YRGO - DIGITAL DESIGN X WEBBUTVECKLING</p>
                    <p>YRGO - DIGITAL DESIGN X WEBBUTVECKLING</p>
                    <p>YRGO - DIGITAL DESIGN X WEBBUTVECKLING</p>
                    <p>YRGO - DIGITAL DESIGN X WEBBUTVECKLING</p>
                    <p>YRGO - DIGITAL DESIGN X WEBBUTVECKLING</p>
                    <p>YRGO - DIGITAL DESIGN X WEBBUTVECKLING</p>
                    <p>YRGO - DIGITAL DESIGN X WEBBUTVECKLING</p>
                    <p>YRGO - DIGITAL DESIGN X WEBBUTVECKLING</p>
                    <p>YRGO - DIGITAL DESIGN X WEBBUTVECKLING</p>
                    <p>YRGO - DIGITAL DESIGN X WEBBUTVECKLING</p>
                    <p>YRGO - DIGITAL DESIGN X WEBBUTVECKLING</p>
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
                    
                    <PuzzlePieceStudent text={"Student"} />
                </div>

                <div className={styles.infoTextWrapper}>
                    <p>Each participant receives a personal digital puzzle piece.</p>
                    <p>No business cards – connect each others puzzle pieces and expand your professional network.</p>
                </div>

                <div className={styles.dividerWrapper}>
                    <div className={styles.divider}></div>
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

                <div className={styles.dividerWrapper}>
                    <div className={styles.divider}></div>
                </div>

                <Link to="/login" className={styles.loginLink}>
                    I already have an account
                </Link>
            </section>

            <footer>
                <div className={styles.timeWrapper}>
                    <img src="/clock_icon.svg" alt="Clock Icon" />
                    <p>22 April 15-16:30</p>
                 </div>
                <div className={styles.placeWrapper}>
                    <img src="/location_icon.svg" alt="Location Icon" />
                    <div className={styles.locationWrapper}>
                        <Link to="https://maps.app.goo.gl/3k1rLBgPZELWQJqx9" target="_blank" className={styles.locationLink}>
                            <p>Lindholmspiren 3</p>
                            <p>417 56 Göteborg</p>
                        </Link>
                    </div>
                </div>
                <div className={styles.calendarBtnWrapper}>
                    <AddToCalendar />
                </div>
            </footer>
            
        </main>
    )
}

export default LandingPage