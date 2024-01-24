import { ChangeEvent, FC } from 'react';
import '../assets/css/Textfield.css'

interface TextFieldProps {
    label: string;
    value: string;
    type: 'text' | 'password' | 'email' | 'number' ;
    placeholder: string;
    onChange: (newValue: string) => void;
}

export const VerticalTextField: FC<TextFieldProps> = ({ label, value, placeholder, type, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className='block w-full h-fit py-2 px-2 justify-between items-center'>
            <label className='w-full text-left text-lg'>{label}</label>
            <input 
                className={`flex w-full h-fit py-2 pl-4 bg-gray-400/20 rounded-md mt-1`} 
                type={type} 
                placeholder={placeholder} 
                value={value} 
                onChange={handleChange} 
                autoComplete={type === 'password' ? 'current-password' : undefined} 
            />
        </div>
    )
}

export const HorizontalTextField: FC<TextFieldProps> = ({ label, value, placeholder, type, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className='flex w-full h-fit py-2 px-2 justify-between items-center'>
            <label className='text-lg'>{label}</label>
            <input className={`flex w-full max-w-[200px] h-fit py-1 pl-4 bg-gray-400/20 rounded-md`} type={type} placeholder={placeholder} value={value} onChange={handleChange} />
        </div>
    );
};