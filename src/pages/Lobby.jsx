import { useEffect, useState } from 'react'
import { useEventStatus } from '../lib/useEventStatus'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../lib/useUser'
import { supabase } from '../lib/supabase'

function Lobby() {
    const eventActive = useEventStatus()
    const navigate = useNavigate()
    const user = useUser()
    const [checkedIn, setCheckedIn] = useState(false)

    const handleCheckIn = async () => {
        await supabase
            .from('users')
            .update({ checked_in: true })
            .eq('id', user.id)
        setCheckedIn(true)
    }

    useEffect(() => {
        if (eventActive) {
            navigate('/');
        }
    }, [eventActive])

    return (
        <main>
            <h1>The event is about to start</h1>
            {checkedIn ? (
                <p>You are checked in! Please wait for the event to start.</p>
            ) : (
                <button onClick={handleCheckIn}>Check In</button>
            )}
        </main>
    )
}

export default Lobby;