export const sendLoginEmail = async (email, loginCode) => {
    const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({ email, loginCode })
        }
    )

    if (!response.ok) {
        const errorData = await response.json()
        console.error('Failed to send email', errorData)
    }
}