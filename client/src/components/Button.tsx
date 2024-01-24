import { FC, ButtonHTMLAttributes, ReactNode } from 'react';

// Define the props for the Button component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    className: string;
}

interface IconButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    className: string;
}

export const Button: FC<ButtonProps> = ({ label, className, ...rest }) => {
    return (
        <button className={`transition-all duration-200 hover:scale-110 rounded-lg px-6 py-2 ${className}`} {...rest}>
            {label}
        </button>
    );
};

export const IconButton: FC<IconButtonProp> = ({ icon, className, ...rest }) => {
    return (
        <button className={`transition-all duration-200 ${className}`} {...rest}>
            {icon}
        </button>
    );
};