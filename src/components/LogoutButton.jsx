import { logout } from "../lib/useUser";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;