import { Link } from 'react-router-dom'
import styles from './RegisterLandingPage.module.css'
import RegisterButton from '../components/RegisterButton.jsx'

function RegisterLandingPage() {
    return (
        <main className={styles.registerLandingPage}>
            <p className={styles.topText}>
                YRGO - DIGITAL DESIGNER - APRIL 22
            </p>

            <h1>Networking with <b>purpose</b></h1>

            <p className={styles.bottomHeaderText}>
                An evening where Sweden's best design students meet the employers of tomorrow
            </p>

            <section className={styles.mainSection}>
                <h6>THE CONCEPT</h6>
                <h3>Two parts.</h3>
                <h3>One connection.</h3>

                <div className={styles.puzzleWrapper}>
                    <div className={styles.student}>
                        <h5>STUDENT</h5>
                    </div>
                    <div className={styles.company}>
                        <h5>COMPANY</h5>
                    </div>
                </div>

                <Link to="/register">
                    <RegisterButton />
                </Link>

                <div className={styles.bottomText}>
                    <p>SCAN</p>
                    <p>CONNECT</p>
                    <p>SAVE</p>
                </div>
                
            </section>

            <section className={styles.stats}>
                <div className={styles.employed}>
                    <h5>94%</h5>
                    <p>Employed</p>
                </div>
                <div className={styles.program}>
                    <h5>2</h5>
                    <p>Program</p>
                </div>
                <div className={styles.ranking}>
                    <h5>#1</h5>
                    <p>In Sweden</p>
                </div>
            </section>

            <section className={styles.infoWrapper}>

                <h4>What you get</h4>

                <div className={styles.info}>
                    <div className={`${styles.numberBox} ${styles.numberBoxAccent}`}>
                        <h5>1</h5>
                    </div>
                    <p>Get inspired by tomorrow's designers - today</p>
                </div>
                <div className={styles.info}>
                    <div className={styles.numberBox}>
                        <h5>2</h5>
                    </div>
                    <p>Network with the companies shaping the future of design</p>
                </div>
                <div className={styles.info}>
                    <div className={styles.numberBox}>
                        <h5>3</h5>
                    </div>
                    <p>Find your next hire among job-ready design students</p>
                </div>

                <div className={styles.instructions}>
                    <p>How it works</p>
                    <p>Each participant receives a digital puzzle piece with a QR code. </p>
                    <p>No business cards – scan each others puzzle pieces and expand your professional network.</p>
                </div>

                <p className={styles.ending}>Are you a student? Register here</p>
            </section>
        </main>
    )
}

export default RegisterLandingPage