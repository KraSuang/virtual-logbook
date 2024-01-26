import Navbar from "../components/Navbar.tsx"
import { Modal_Setting } from "../components/Modal.tsx"
import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import { Login, Register } from "./Authentication.tsx"
import Overview from "./Overview.tsx"

export default function Main() {
    const [isSettingOpen, setIsSettingOpen] = useState(false);

    const openSettingModal = () => {
        setIsSettingOpen(true)
    }

    const closeSettingModal = () => {
        setIsSettingOpen(false)
    }

    return (
        <>
            <div className={`flex flex-col w-full h-dvh overflow-auto px-6 py-6 font-Roboto bg-background`}>
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