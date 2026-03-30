import { supabase } from "./supabase"

export const getUniqueCode = async () => {

    let code
    let isUnique = false

    while (!isUnique) {
        code = Math.floor(1000 + Math.random() * 9000).toString()
        
        const { data } = await supabase
            .from('users')
            .select('code')
            .eq('code', code)

        if (data.length === 0) {
            isUnique = true
        }
    }
    return code
}