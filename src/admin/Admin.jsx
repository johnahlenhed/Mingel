import { useState } from "react";
import { supabase } from "../lib/supabase.js";
import styles from "./Admin.module.css";
import { useState, useEffect } from "react";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

function Admin() {
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState(null);
    const [eventActive, setEventActive] = useState(false);

    // Handle event status
    useEffect(() => {
        const fetchStatus = async () => {
            const { data } = await supabase
                .from('settings')
                .select('event_active')
                .single();
            
            setEventActive(data.event_active);
        }
        fetchStatus()
    }, [])

    const toggleEvent = async () => {
        const { data } = await supabase
            .from('settings')
            .update({ event_active: !eventActive })
            .eq('id', '1451a93e-4633-4a40-9cfb-1dd110eab0dd')
            .select()
            .single()
        setEventActive(data.event_active);
    }

    const handleLogin = (e) => {
        e.preventDefault()
        if (password === ADMIN_PASSWORD) {
            setAuthenticated(true);
            setError(null);
        } else {
            setError('Invalid password');
        }
    }

    const completePuzzle = async () => {
        await supabase
            .from('settings')
            .update({ puzzle_completed: true })
            .eq('id', '1451a93e-4633-4a40-9cfb-1dd110eab0dd')
    }

    if (!authenticated) {
        return (
            <main>
                <form onSubmit={handleLogin}>
                    <input
                        type="password"
                        placeholder="Enter admin password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                    {error && <p>{error}</p>}
                </form>
            </main>
        )
    }

    return (
        <main>
            <h1>Admin Panel</h1>
            <button onClick={completePuzzle}>Complete Puzzle</button>
            <button onClick={toggleEvent}>
                {eventActive ? 'Deactivate Event' : 'Activate Event'}
            </button>
        </main>
    )
}

export default Admin;