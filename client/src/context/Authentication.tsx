import { VerticalTextField } from "../components/Textfield.tsx"
import { Button } from "../components/Button.tsx";
import { useState } from "react";

export function Login() {
    const errorCode = [
        { id: 0, title: "" },
        { id: 1, title: "Please enter email address and password." },
        { id: 2, title: "Please enter email address." },
        { id: 3, title: "Please enter password." },
        { id: 4, title: "Invalid email address." },
    ]

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [isError, setIsError] = useState(false)
    const [isErrorType, setIsErrorType] = useState(0)

    const handleChange = (field: string, value: string) => {
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [field]: value,
        }));
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleLogin = () => {
        setIsError(false);
        setIsErrorType(0)

        if (credentials.email.trim() === '' && credentials.password.trim() === '') {
            setIsError(true);
            setIsErrorType(1);
        } else if (credentials.email.trim() === '') {
            setIsError(true);
            setIsErrorType(2);
        } else if (!emailRegex.test(credentials.email.trim())) {
            setIsError(true);
            setIsErrorType(4); // Set a new error type for invalid email
        } else if (credentials.password.trim() === '') {
            setIsError(true);
            setIsErrorType(3);
        } else {
            if (isError) {
                setIsError(false);
                setIsErrorType(0);
            }
            console.log('Logging in with:', credentials);
        }
    };

    return (
        <form 
            className="flex w-full h-full justify-center items-center pb-10"
            onSubmit={(e) => {
                e.preventDefault(); // Prevent the default form submission
                handleLogin(); // Call your login logic after validation
        }}>
            <div className="block px-6 py-6 w-full max-w-[460px] h-fit bg-background-content shadow-md rounded-2xl">
                <p className="text-[32px] mb-4 px-1.5">Login</p>
                <VerticalTextField
                    label="Email Address"
                    placeholder="Email Address"
                    type="email"
                    value={credentials.email}
                    onChange={(newValue) => handleChange('email', newValue)}
                />
                <VerticalTextField
                    label="Password"
                    placeholder="Password"
                    type="password"
                    value={credentials.password}
                    onChange={(newValue) => handleChange('password', newValue)}
                />
                <div className={`${isError ? `block` : `hidden`} w-full h-fit px-1.5 mt-2`}>
                    <div className="flex w-full h-fit py-2 pl-6 bg-red-500 animate-pulse rounded-md">
                        {errorCode.map((err) => {
                            if (err.id === isErrorType) {
                                return (
                                    <p className="text-white">{err.title}</p>
                                )
                            }
                        })}
                    </div>
                </div>
                <div className="flex w-full h-fit mt-6 justify-center">
                    <Button
                        label="Login"
                        className="bg-button-login text-text-login text-xl hover:bg-button-login-hover hover:text-text-login-hover shadow-md"
                        onClick={handleLogin}
                    />
                </div>
                <div className="flex w-full h-fit mt-2 justify-center">
                    <a rel="link" href="/register" className="text-gray-800/60 text-sm underline">Sign up</a>
                </div>
            </div>
        </form>
    )
}

export function Register() {
    const errorCode = [
        { id: 0, title: "" },
        { id: 1, title: "Please enter data." },
        { id: 2, title: "Please enter email address." },
        { id: 3, title: "Please enter password." },
        { id: 4, title: "Please enter firstname." },
        { id: 5, title: "Please enter lastname." },
        { id: 6, title: "Invalid email address." },
    ]

    const [credentials, setCredentials] = useState({ email: '', password: '', first: '', last: '', simbrief: '' });
    const [isError, setIsError] = useState(false)
    const [isErrorType, setIsErrorType] = useState(0)

    const handleChange = (field: string, value: string) => {
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [field]: value,
        }));
    };


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSignUp = () => {
        setIsError(false);
        setIsErrorType(0)

        if (credentials.email.trim() === '' && credentials.password.trim() === '' && credentials.first.trim() === '' && credentials.last.trim() === '') {
            setIsError(true);
            setIsErrorType(1);
        } else if (credentials.email.trim() === '') {
            setIsError(true);
            setIsErrorType(2);
        } else if (!emailRegex.test(credentials.email.trim())) {
            setIsError(true);
            setIsErrorType(6); // Set a new error type for invalid email
        } else if (credentials.password.trim() === '') {
            setIsError(true);
            setIsErrorType(3);
        } else if (credentials.first.trim() === '') {
            setIsError(true);
            setIsErrorType(4);
        } else if (credentials.last.trim() === '') {
            setIsError(true);
            setIsErrorType(5);
        } else {
            if (isError) {
                setIsError(false);
                setIsErrorType(0);
            }
            console.log('Logging in with:', credentials);
        }
    };

    return (
        <div className="flex w-full h-full justify-center items-center pb-10">
            <div className="block px-6 py-6 w-full max-w-[460px] h-fit bg-background-content shadow-md rounded-2xl">
                <p className="text-[32px] mb-4 px-1.5">Register</p>
                <VerticalTextField
                    label="Email Address"
                    placeholder="Email Address"
                    type="email"
                    value={credentials.email}
                    onChange={(newValue) => handleChange('email', newValue)}
                />
                <VerticalTextField
                    label="Password"
                    placeholder="Password"
                    type="password"
                    value={credentials.password}
                    onChange={(newValue) => handleChange('password', newValue)}
                />
                <div className={`flex w-full h-fit`}>
                    <VerticalTextField
                        label="First Name"
                        placeholder="First Name"
                        type="text"
                        value={credentials.first}
                        onChange={(newValue) => handleChange('first', newValue)}
                    />
                    <VerticalTextField
                        label="Last Name"
                        placeholder="Last Name"
                        type="text"
                        value={credentials.last}
                        onChange={(newValue) => handleChange('last', newValue)}
                    />
                </div>
                <VerticalTextField
                    label="Simbrief UserID"
                    placeholder="UserID (You can fill it later.)"
                    type="number"
                    value={credentials.simbrief}
                    onChange={(newValue) => handleChange('simbrief', newValue)}
                />
                <div className={`${isError ? `block` : `hidden`} w-full h-fit px-1.5 mt-2`}>
                    <div className="flex w-full h-fit py-2 pl-6 bg-red-500 animate-pulse rounded-md">
                        {errorCode.map((err) => {
                            if (err.id === isErrorType) {
                                return (
                                    <p className="text-white">{err.title}</p>
                                )
                            }
                        })}
                    </div>
                </div>
                <div className="flex w-full h-fit mt-6 justify-center">
                    <Button
                        label="Register"
                        className="bg-button-login text-text-login text-xl hover:bg-button-login-hover hover:text-text-login-hover shadow-md"
                        onClick={handleSignUp}
                    />
                </div>
                <div className="flex w-full h-fit mt-2 justify-center">
                    <a rel="link" href="/login" className="text-gray-800/60 text-sm underline">Cancel</a>
                </div>
            </div>
        </div>
    )
}

