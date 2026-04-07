import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";
import styles from "./Puzzle.module.css";

const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    src: `/puzzle/piece${i + 1}.svg`
}))

function Puzzle() {
    const [unlockedPieces, setUnlockedPieces] = useState(0)

    useEffect(() => {
        // Fetch unlocked pieces from Supabase
        const fetchCount = async () => {
            const { count } = await supabase
                .from('connections')
                .select('*', { count: 'exact' })
                .eq('status', 'accepted')

                setUnlockedPieces(Math.floor(count / 3)) // Unlock one piece for every 3 connections
        }

        fetchCount()

        // Listen for real-time updates
        const subscription = supabase
            .channel('connections')
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'connections',
                filter: 'status=eq.accepted'
            }, async () => {
                await fetchCount()
            })
            .subscribe()

        return () => subscription.unsubscribe()
    }, [])

    return (
        <main className={styles.puzzleGrid}>
            {pieces.map((piece) => (
                <img
                    key={piece.id}
                    src={piece.src}
                    alt={`Puzzle piece ${piece.id}`}
                    className={`${styles.piece} ${piece.id <= unlockedPieces ? styles.unlocked : ''}`}
                />
            ))}
        </main>
    )
}

export default Puzzle;