import { MdOutlineAirplanemodeActive } from 'react-icons/md'
import { HorizonDataGrid } from '../components/DataGrid.tsx'
import { Button } from '../components/Button.tsx';
import { useUserDataApi } from '../api/UserData.ts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useFlightPlanDataAPI } from '../api/FlightPlan.ts'

export default function Overview() {
    const navigate = useNavigate()
    const { userData, loading } = useUserDataApi()
    const { flightPlanData } = useFlightPlanDataAPI()

    useEffect(() => {
        // Now you can use the 'userData' and 'loading' states in your component.
        console.log('User Data:', userData);
        console.log('Loading:', loading);
    }, [userData, loading]);

    const handleAddFlightPlanClick = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            const response = await axios.post('http://api.localhost:10154/v1/flightplan/add', {
                uid: userData?.uid,
                simbrief: userData?.link.simbrief
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.data) {
                throw new Error('Failed to fetch data');
            }
            else {
                console.log(response.data)
                navigate('/')
            }

        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="block w-full h-full overflow-hidden animate-pulse">
                <div className="h-[36px] font-semibold uppercase mb-4 px-3 w-full bg-gray-200 rounded-lg"></div>
                <div className="flex w-full h-full max-h-[180px] justify-between">
                    <div className="block w-full h-full bg-gray-200 shadow-md rounded-2xl px-6 py-3 mr-1 justify-between items-center">
                        <div className='flex w-full h-fit justify-between items-center'>
                            <div className="w-6/12 rounded-lg h-[24px] bg-gray-300"></div>
                            <div className="w-3/12 rounded-lg h-[18px] bg-gray-300"></div>
                        </div>
                        <div>
                            <div className="flex w-full h-fit justify-center my-2 ">
                                <div className="w-3/12 rounded-lg h-[24px] bg-gray-300"></div>
                            </div>
                        </div>
                        <div className="flex w-full h-fit justify-between items-center">
                            <div className="w-4/12 rounded-lg h-[36px] bg-gray-300"></div>
                            <div className="w-2/12 rounded-lg h-[60px] bg-gray-300"></div>
                            <div className="w-4/12 rounded-lg h-[36px] bg-gray-300"></div>
                        </div>
                    </div>
                    <div className={`block w-fit h-full bg-gray-200 shadow-md rounded-2xl text-nowrap py-3 px-6 ml-1 justify-between items-center`}>
                        <div className="w-[200px] mb-2 rounded-lg h-[18px] bg-gray-300"></div>
                        <div className="w-4/12 mb-2 rounded-lg h-[14px] bg-gray-300"></div>
                        <div className="w-4/12 mb-2 rounded-lg h-[14px] bg-gray-300"></div>
                    </div>
                </div>
                <div className='block w-full h-full py-4 mt-3 bg-gray-200 px-3 rounded-2xl shadow-md'>

                </div>
            </div>
        )
    }

    return (
        <div className="block w-full h-full overflow-hidden ">
            <p className="text-3xl font-semibold uppercase mb-4 px-3 w-full">{userData?.name.first} {userData?.name.last}</p>
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
                    <p className="text-sm font-normal uppercase w-full">Total Flight : 0</p>
                    <p className="text-sm font-normal uppercase w-full">Flight Time : 00 Hour 00 Minute</p>
                </div>
            </div>
            <div className='block w-full h-fit py-4 mt-3 bg-background-content px-3 rounded-2xl shadow-md'>
                <div className='flex w-full h-fit justify-between px-4 items-center'>
                    <p className='text-lg font-semibold uppercase'>Your Recent Flights</p>
                    <Button label='Add Flight Plan' className='bg-gray-600 text-nowrap text-white hover:bg-gray-800 hover:scale-105' onClick={handleAddFlightPlanClick} />
                </div>
                <div className='w-full h-full max-h-[650px] overflow-y-scroll my-2 px-3 z-0'>
                    {flightPlanData.map((data, index) => {
                        return (
                            <div key={index}>
                                <HorizonDataGrid flight={data?.flightPlan.general.callsign} dep_icao={data?.flightPlan.origin.icao_code} arr_icao={data.flightPlan.destination.icao_code} aircraft_icao={data?.flightPlan.alternate.icao_code} airframe={data?.flightPlan.aircraft.icaocode} departure_time={data?.flightPlan.general.times.dep_time} time_enroute={data?.flightPlan.general.times.air_time} date_add={data?.ident.date_create} />
                            </div>
                        )
                    })}
                </div>
                <div className='flex w-full h-fit justify-center mt-2 items-center'>
                    <Button label='See All' className='bg-gray-600 text-nowrap text-white hover:bg-gray-800 hover:scale-105' />
                </div>
            </div>
        </div>
    )
}