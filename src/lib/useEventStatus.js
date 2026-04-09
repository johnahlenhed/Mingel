import { useEffect, useState } from "react";
import { supabase } from "./supabase.js";

export const useEventStatus = () => {
    const [eventActive, setEventActive] = useState(null);

    useEffect(() => {
        const fetchStatus = async () => {
            const { data } = await supabase
                .from('settings')
                .select('event_active')
                .single();

            setEventActive(data.event_active);
        }

        fetchStatus();

        const subscription = supabase
            .from('settings')
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'settings'
            }, (payload) => {
                setEventActive(payload.new.event_active);
            })
            .subscribe()

        return () => subscription.unsubscribe();
    }, [])

    return eventActive;
}