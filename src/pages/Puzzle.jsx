import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase.js";
import styles from "./Puzzle.module.css";
import { QRCodeSVG } from "qrcode.react";
import { useEventStatus } from "../lib/useEventStatus.js";

function Puzzle() {
    const [unlockedPieces, setUnlockedPieces] = useState()
    const [svgContent, setSvgContent] = useState('')
    const wrapperRef = useRef(null)
    const eventActive = useEventStatus()

    // Add class to body for page-specific styling and fetch SVG content
    useEffect(() => {
        document.body.classList.add('puzzle-page')
        fetch('/puzzle/puzzle.svg')
            .then(res => res.text())
            .then(text => setSvgContent(text))
        return () => document.body.classList.remove('puzzle-page')
    }, [])

    // Update SVG classes after content or unlocked pieces change
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

    // Fetch initial count of accepted connections and subscribe to changes
    const fetchCount = async () => {
        const { count } = await supabase
            .from('connections')
            .select('*', { count: 'exact' })
            .eq('status', 'accepted')
        setUnlockedPieces(2 + Math.floor(count / 3))
    }

    // Fetch initial puzzle completion status and subscribe to changes
    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase
                .from('settings')
                .select('puzzle_completed')
                .single()
            if (data?.puzzle_completed) {
                setUnlockedPieces(50)
            } else {
                fetchCount() // Fetch initial count of accepted connections to determine unlocked pieces
            }
        }
        fetchSettings()
    }, [])

    // Subscribe to changes in accepted connections to update unlocked pieces in real-time
    useEffect(() => {
        const subscription = supabase
            .channel('puzzle-connections')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'connections', filter: 'status=eq.accepted' },
                async () => await fetchCount())
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'connections', filter: 'status=eq.accepted' },
                async () => await fetchCount())
            .subscribe()
        return () => subscription.unsubscribe()
    }, [])

    // Subscribe to puzzle completion status changes
    useEffect(() => {
        const subscription = supabase
            .channel('puzzle-settings')
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'settings',
            }, (payload) => {
                if (payload.new.puzzle_completed) {
                    setUnlockedPieces(50)
                } else {
                    fetchCount()
                }
            })
            .subscribe()
        
        return () => subscription.unsubscribe()
    }, [])

    return (
        <>
            {!eventActive ? (
                <div>
                    <QRCodeSVG
                        value="https://mingel.vercel.app/register"
                        size={256}
                    />
                </div>
            ) : (
                <div
                    ref={wrapperRef}
                    className={styles.puzzleWrapper}
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                />
            )}
        </>
        
    )
}

export default Puzzle;