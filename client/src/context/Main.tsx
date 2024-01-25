import Navbar from "../components/Navbar.tsx"
import { Modal_Setting } from "../components/Modal.tsx"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from 'axios'
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
        const AccessTokenData = async () => {
            const AccessToken = localStorage.getItem('accessToken');

            try {
                const response = await axios.get('http://api.localhost:10154/access/protection', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${AccessToken}`
                    },
                });

                const accessResult = response.data
                if(accessResult.status === 401 && accessResult === 403) {
                    navigate('/login')
                }
            } catch (error) {
                navigate('/login')
            }
        };

        AccessTokenData(); // Call the function directly

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