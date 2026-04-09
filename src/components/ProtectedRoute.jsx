import { useEventStatus } from "../lib/useEventStatus";
import { Navigate } from "react-router-dom";
import { useUser } from "../lib/useUser.js";

function ProtectedRoute({ children }) {
    const eventActive = useEventStatus()
    const user = useUser();

    if (eventActive === null) return <p>Loading...</p>

    if (!user) return <Navigate to="/login" />
    if (!eventActive) return <Navigate to="/lobby" />

    return children;
}

export default ProtectedRoute