import { MdOutlineAirplanemodeActive } from 'react-icons/md'
import { HorizonDataGrid } from '../components/DataGrid.tsx'
import { Button } from '../components/Button.tsx';

const flightData = [
    { flight: "LH123", dep_icao: "EDDF", arr_icao: "LSZH", aircraft_icao: "A320", airframe: "D-AIPX", departure_time: "05:17 UTC", time_enroute: "0:52", date_add: "2024-01-24", },
    { flight: "BA456", dep_icao: "EGLL", arr_icao: "LFPG", aircraft_icao: "B77W", airframe: "G-VIIO", departure_time: "05:17 UTC", time_enroute: "2:40", date_add: "2024-01-24", },
    { flight: "DL789", dep_icao: "KATL", arr_icao: "KJFK", aircraft_icao: "B738", airframe: "N123DL", departure_time: "05:17 UTC", time_enroute: "2:10", date_add: "2024-01-24", },
    { flight: "EK432", dep_icao: "OMDB", arr_icao: "YSSY", aircraft_icao: "A380", airframe: "A6-EDM", departure_time: "05:17 UTC", time_enroute: "14:30", date_add: "2024-01-24", },
    { flight: "SQ345", dep_icao: "WSSS", arr_icao: "KSFO", aircraft_icao: "B789", airframe: "9V-SCB", departure_time: "05:17 UTC", time_enroute: "16:45", date_add: "2024-01-25", },
    { flight: "LH123", dep_icao: "EDDF", arr_icao: "LSZH", aircraft_icao: "A320", airframe: "D-AIPX", departure_time: "05:17 UTC", time_enroute: "1:30", date_add: "2024-01-24", },
    { flight: "BA456", dep_icao: "EGLL", arr_icao: "LFPG", aircraft_icao: "B77W", airframe: "G-VIIO", departure_time: "05:17 UTC", time_enroute: "1:45", date_add: "2024-01-24", },
    { flight: "DL789", dep_icao: "KATL", arr_icao: "KJFK", aircraft_icao: "B738", airframe: "N123DL", departure_time: "05:17 UTC", time_enroute: "2:15", date_add: "2024-01-24", },
    { flight: "EK432", dep_icao: "OMDB", arr_icao: "YSSY", aircraft_icao: "A380", airframe: "A6-EDM", departure_time: "05:17 UTC", time_enroute: "14:30", date_add: "2024-01-24", },
    { flight: "SQ345", dep_icao: "WSSS", arr_icao: "KSFO", aircraft_icao: "B789", airframe: "9V-SCB", departure_time: "05:17 UTC", time_enroute: "16:45", date_add: "2024-01-25", },
    { flight: "LH123", dep_icao: "EDDF", arr_icao: "LSZH", aircraft_icao: "A320", airframe: "D-AIPX", departure_time: "05:17 UTC", time_enroute: "0:52", date_add: "2024-01-24", },
    { flight: "BA456", dep_icao: "EGLL", arr_icao: "LFPG", aircraft_icao: "B77W", airframe: "G-VIIO", departure_time: "05:17 UTC", time_enroute: "2:40", date_add: "2024-01-24", },
    { flight: "DL789", dep_icao: "KATL", arr_icao: "KJFK", aircraft_icao: "B738", airframe: "N123DL", departure_time: "05:17 UTC", time_enroute: "2:10", date_add: "2024-01-24", },
    { flight: "EK432", dep_icao: "OMDB", arr_icao: "YSSY", aircraft_icao: "A380", airframe: "A6-EDM", departure_time: "05:17 UTC", time_enroute: "14:30", date_add: "2024-01-24", },
    { flight: "SQ345", dep_icao: "WSSS", arr_icao: "KSFO", aircraft_icao: "B789", airframe: "9V-SCB", departure_time: "05:17 UTC", time_enroute: "16:45", date_add: "2024-01-25", },
    { flight: "LH123", dep_icao: "EDDF", arr_icao: "LSZH", aircraft_icao: "A320", airframe: "D-AIPX", departure_time: "05:17 UTC", time_enroute: "1:30", date_add: "2024-01-24", },
    { flight: "BA456", dep_icao: "EGLL", arr_icao: "LFPG", aircraft_icao: "B77W", airframe: "G-VIIO", departure_time: "05:17 UTC", time_enroute: "1:45", date_add: "2024-01-24", },
    { flight: "DL789", dep_icao: "KATL", arr_icao: "KJFK", aircraft_icao: "B738", airframe: "N123DL", departure_time: "05:17 UTC", time_enroute: "2:15", date_add: "2024-01-24", },
    { flight: "EK432", dep_icao: "OMDB", arr_icao: "YSSY", aircraft_icao: "A380", airframe: "A6-EDM", departure_time: "05:17 UTC", time_enroute: "14:30", date_add: "2024-01-24", },
    { flight: "SQ345", dep_icao: "WSSS", arr_icao: "KSFO", aircraft_icao: "B789", airframe: "9V-SCB", departure_time: "05:17 UTC", time_enroute: "16:45", date_add: "2024-01-25", }
];

export default function Overview() {
    return (
        <div className="block w-full h-full overflow-hidden ">
            <p className="text-3xl font-semibold uppercase mb-4 px-3 w-full">Kanin Pornsirinruk</p>
            <div className="flex w-full h-full max-h-[180px] justify-between">
                <div className="block w-full h-full bg-background-content shadow-md rounded-2xl px-6 py-3 mr-1 justify-between items-center">
                    <div className='flex w-full h-fit justify-between items-center'>
                        <p className="text-lg font-semibold uppercase">Lastest Flight Plan</p>
                        <p className="text-base font-light">2024 Jan 14 - 01:14 UTC</p>
                    </div>
                    <p className="text-xl text-center font-medium uppercase my-4">THA456</p>
                    <div className="flex w-full h-fit justify-between items-center">
                        <p className="text-base font-medium uppercase w-full">VTBS <br /> SUVARNABHUMI</p>
                        <MdOutlineAirplanemodeActive className='text-[60px] w-full rotate-90' />
                        <p className="text-base font-medium uppercase text-right w-full">VTCC <br /> CHIANG MAI</p>
                    </div>
                </div>
                <div className={`block w-fit h-full bg-background-content shadow-md rounded-2xl text-nowrap py-3 px-6 ml-1 justify-between items-center`}>
                    <p className="text-lg font-semibold uppercase w-full">Detail</p>
                    <p className="text-sm font-normal uppercase w-full">Flight Time : 00 Hour 00 Minute</p>
                </div>
            </div>
            <div className='block w-full h-fit py-4 mt-3 bg-background-content px-3 rounded-2xl shadow-md'>
                <div className='flex w-full h-fit justify-between px-4 items-center'>
                    <p className='text-lg font-semibold uppercase'>Your Recent Flights</p>
                    <Button label='Add Flight Plan' className='bg-gray-600 text-nowrap text-white hover:bg-gray-800 hover:scale-105' />
                </div>
                <div className='w-full h-full max-h-[700px] overflow-y-scroll py-2 px-3 z-0'>
                    {flightData.map((data, index) => (
                        <HorizonDataGrid index={index} flight={data.flight} dep_icao={data.dep_icao} arr_icao={data.arr_icao} aircraft_icao={data.aircraft_icao} airframe={data.airframe} departure_time={data.departure_time} time_enroute={data.time_enroute} date_add={data.date_add} />
                    ))}
                </div>
                <div className='flex w-full h-fit justify-center mt-2 items-center'>
                    <Button label='See All' className='bg-gray-600 text-nowrap text-white hover:bg-gray-800 hover:scale-105' />
                </div>
            </div>
        </div>
    )
}