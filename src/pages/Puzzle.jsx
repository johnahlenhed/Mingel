import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase.js";
import styles from "./Puzzle.module.css";


function Puzzle() {
    const [unlockedPieces, setUnlockedPieces] = useState(0)
    const [svgContent, setSvgContent] = useState('')
    const wrapperRef = useRef(null)

    useEffect(() => {
        document.body.classList.add('puzzle-page')
        fetch('/puzzle/puzzle.svg')
            .then(res => res.text())
            .then(text => setSvgContent(text))
        return () => document.body.classList.remove('puzzle-page')
    }, [])

    useEffect(() => {
        if (!svgContent) return
    
        // Väntar tills React har renderat SVG:n i DOM:en
        const timer = setTimeout(() => {
            if (!wrapperRef.current) return
            for (let i = 1; i <= 50; i++) {
                const el = wrapperRef.current.querySelector(`[id="${i}"]`)
                if (el) el.classList.toggle('unlocked', i <= unlockedPieces)
            }
        }, 0)
    
        return () => clearTimeout(timer)
    }, [unlockedPieces, svgContent])


    useEffect(() => {
        const fetchCount = async () => {
            const { count } = await supabase
                .from('connections')
                .select('*', { count: 'exact' })
                .eq('status', 'accepted')
                console.log('count:', count)
            setUnlockedPieces(Math.floor(count / 3))
        }
        fetchCount()
        const subscription = supabase
            .channel('connections')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'connections', filter: 'status=eq.accepted' },
                async () => await fetchCount())
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'connections', filter: 'status=eq.accepted' },
                async () => await fetchCount())
            .subscribe()
        return () => subscription.unsubscribe()
    }, [])

    useEffect(() => {
        const subscription = supabase
            .channel('settings')
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'settings',
            }, (payload) => {
                if (payload.new.puzzle_completed) {
                    setUnlockedPieces(50)
                }
            })
            .subscribe()
        
        return () => subscription.unsubscribe()
    }, [])

    return (
        <div
            ref={wrapperRef}
            className={styles.puzzleWrapper}
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    )
}

export default Puzzle;