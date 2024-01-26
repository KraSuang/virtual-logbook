// auth.ts

import axios from 'axios';

interface Credentials {
    email: string;
    password: string;
}

const login = async (
    credentials: Credentials,
    navigate: (path: string) => void,
    setIsError: React.Dispatch<React.SetStateAction<boolean>>,
    setIsErrorType: React.Dispatch<React.SetStateAction<number>>
) => {
    try {
        const apiUrl = 'http://api.localhost:10154/login';
        const encodedUrl = encodeURI(apiUrl);
        const response = await axios.post(encodedUrl, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.data) {
            // Handle authentication error
            setIsError(true);
            setIsErrorType(1);
            return;
        }

        const { accessToken } = response.data;

        localStorage.setItem('accessToken', accessToken);

        const hasAccessToken = !!localStorage.getItem('accessToken');

        if (hasAccessToken) {
            navigate('/');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
};

export default login;
