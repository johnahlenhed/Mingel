import { useEffects, useState } from "react";
import { supabase } from "../lib/supabase.js";
import { useUser } from "../lib/useUser.js";

export default function ConnectionRequest() {
    const user = useUser()
    const [request, setRequest] = useState(null)

    useEffects(() => {
        if (!user) return

        const subscription = supabase
            .channel('incoming-connections')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'connections',
                filter: `to_user=eq.${user.id}`
            }, async (payload) => {
                // Fetch from_user name
                const { data: sender } = await supabase
                    .from('users')
                    .select('full_name, code')
                    .eq('id', payload.new.from_user)
                    .single()

                setRequest({
                    connectionId: payload.new.id,
                    senderName: sender.full_name,
                    senderCode: sender?.code
                })
            })
            .subscribe()

        return () => subscription.unsubscribe()
    }, [user])

    const handleAccept = async () => {
        await supabase
            .from('connections')
            .update({ status: 'accepted' })
            .eq('id', request.connectionId)
        
        setRequest(null)
    }

    const handleDecline = async () => {
        await supabase
            .from('connections')
            .update({ status: 'declined' })
            .eq('id', request.connectionId)

        setRequest(null)
    }

    if (!request) return null

    return (
        <div>
            <div>
                <h3>Connection request</h3>
                <p>{request.senderName} wants to connect!</p>
                <button onClick={handleAccept}>Accept</button>
                <button onClick={handleDecline}>Decline</button>
            </div>
        </div>
    )
}