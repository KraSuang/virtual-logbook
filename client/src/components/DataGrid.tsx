import { IconButton } from './Button.tsx'
// import { useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FC } from 'react';

interface HorizontalDataProps {
    flight: string;
    flight_number: number;
    dep_icao: string;
    // dep_iata: string;
    arr_icao: string;
    // arr_iata: string;
    aircraft_icao: string;
    airframe: string;
    departure_time: string;
    time_enroute: string;
    date_add: string;
}

export const HorizonDataGrid: FC<HorizontalDataProps> = ({ flight, flight_number, dep_icao, arr_icao, aircraft_icao, airframe, departure_time, time_enroute, date_add, ...rest }) => {
    return (
        <div className='flex w-full shadow-md h-fit bg-background-content rounded-lg border-2 border-gray-800/20 px-3 py-2 justify-center items-center my-3'>
            <p className='w-full text-center
                sm:text-sm 
                md:text-base
                lg:text-lg
                xl:text-xl
            '>{flight}</p>
            <p className='w-full text-center
                sm:text-sm 
                md:text-base
                lg:text-lg
                xl:text-xl
            '>{dep_icao}</p>
            <p className='w-full text-center
                sm:text-sm 
                md:text-base
                lg:text-lg
                xl:text-xl
            '>{arr_icao}</p>
            <p className='w-full text-center
                sm:text-sm 
                md:text-base
                lg:text-lg
                xl:text-xl
            '>{aircraft_icao}</p>
            <p className='w-full text-center
                sm:text-sm 
                md:text-base
                lg:text-lg
                xl:text-xl
            '>{airframe}</p>
            <p className='w-full text-center
                sm:text-sm 
                md:text-base
                lg:text-lg
                xl:text-xl
            '>{departure_time}</p>
            <p className='w-full text-center
                sm:text-sm 
                md:text-base
                lg:text-lg
                xl:text-xl
            '>{time_enroute}</p>
            <p className='w-full text-center mr-4
                sm:text-sm 
                md:text-base
                lg:text-lg
                xl:text-xl
            '>{date_add}</p>
            <div className="flex w-fit px-1">
                <IconButton icon={<FaEye />} className='bg-gray-600 hover:bg-gray-800 p-2 rounded-md text-white  mx-1' {...rest} />
                <IconButton icon={<HiOutlineDotsHorizontal />} className='bg-gray-600 hover:bg-gray-800 p-2 rounded-md text-white mx-1' {...rest} />
            </div>
        </div>
    );
};
