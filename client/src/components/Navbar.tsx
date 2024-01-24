import { Button, IconButton } from "./Button.tsx"
import { FaGear } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'


interface NavbarProps {
    Setting_Open: () => void;
}

export default function Navbar({ Setting_Open }: NavbarProps) {

    const navigate = useNavigate()

    const goSignUp = () => {
        navigate('/signup')
    }
    return(
        <div className={`flex w-full h-[60px] bg-background-navbar rounded-xl justify-between items-center px-6`}>
            <p className={`text-2xl text-text-navbar`}>LOGBOOK</p>
            <div className={`w-fit h-full justify-center items-center hidden`}>
                <Button label={`Add FlightPlan`} className={`text-base text-white`}/> 
                <IconButton icon={<FaGear/>} className={`text-2xl text-white animate-none hover:scale-125`} onClick={Setting_Open}/>
            </div>
        </div>
    )
} 