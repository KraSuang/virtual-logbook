import { useState, useEffect } from 'react';
import axios from 'axios';

interface GETUserData {
    uid: number;
    name: {
        first: string;
        last: string;
    }
    email: string;
    link: {
        simbrief: string;
    }
}

export const useUserDataApi = () => {
    const [userData, setUserData] = useState<GETUserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');

                const response = await axios.get('http://api.localhost:10154/v1/user', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.data) {
                    throw new Error('Failed to fetch data');
                }

                const data: GETUserData = response.data;
                setUserData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { userData, loading };
};
