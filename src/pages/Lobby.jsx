import { useEffect } from 'react'
import { useEventStatus } from '../lib/useEventStatus'
import { useNavigate } from 'react-router-dom'

function Lobby() {
    const eventActive = useEventStatus();
    const navigate = useNavigate();

    useEffect(() => {
        if (eventActive) {
            navigate('/home');
        }
    }, [eventActive])

    return (
        <main>
            <h1>The event is about to start</h1>
            <p>Please wait while we prepare everything for you</p>
        </main>
    )
}

export default Lobby;