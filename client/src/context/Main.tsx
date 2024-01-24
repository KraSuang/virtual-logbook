import Navbar from "../components/Navbar.tsx"
import { Modal_Setting } from "../components/Modal.tsx"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { Login, Register } from "./Authentication.tsx"
import Overview from "./Overview.tsx"

export default function Main() {
    const navigate = useNavigate();
    const location = useLocation()
    const [isSettingOpen, setIsSettingOpen] = useState(false);

    const openSettingModal = () => {
        setIsSettingOpen(true)
    }

    const closeSettingModal = () => {
        setIsSettingOpen(false)
    }

    useEffect(() => {
        const hasAccessToken = !!localStorage.getItem('accessToken'); // Change this based on how you store the access token
        const isLoginPage = location.pathname === '/login';
        const isRegisterPage = location.pathname === '/register';

        if (!hasAccessToken) {
            if (isLoginPage) {
                navigate('/login');
            } else if (isRegisterPage) {
                // Redirect to signup page
                navigate('/register');
            } else {
                // Redirect to login page for other unauthorized paths
                navigate('/login');
            }
        }
    }, [navigate, location.pathname]);

    return (
        <>
            <div className={`flex flex-col w-full h-dvh px-6 py-6 font-Roboto bg-background`}>
                <Navbar Setting_Open={openSettingModal} />
                <div className="w-full h-full mt-4">
                    <Routes>
                        <Route path="/" element={<Overview />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </div>
            <Modal_Setting isOpen={isSettingOpen} closeModal={closeSettingModal} />
        </>

    )
}