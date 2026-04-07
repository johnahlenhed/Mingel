import { useState } from "react";
import { supabase } from "../lib/supabase.js";
import styles from "./Admin.module.css";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

function Admin() {
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState(null);

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
        // Logic will apply when when Puzzle.jsx is completed, for now we can just simulate it with a button click
        console.log('Puzzle completed!')
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
        </main>
    )
}

export default Admin;