import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserDataApi } from './UserData.ts';

export const useFlightPlanDataAPI = () => {
    const { userData, loading } = useUserDataApi()
    const [flightPlanData, setFlightPlanData] = useState([]);
    const [fploading, setFPLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
            const fetchData = async () => {
                try {
                    const accessToken = localStorage.getItem('accessToken');

                    const response = await axios.get(`http://api.localhost:10154/v1/flightplan`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    });

                    if (!response.data) {
                        throw new Error('Failed to fetch data');
                    }

                    setFlightPlanData(response.data);
                    console.log(response.data)
                } catch (error) {
                    console.error(error);
                } finally {
                    setFPLoading(false);
                }
            };

            fetchData();
        }
    }, [userData]);

    return { flightPlanData, fploading };
};
