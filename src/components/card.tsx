import React from 'react';

interface CardProps {
    children: React.ReactNode
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div className={`border bg-white rounded-lg shadow-md p-4 m-2 ${className || ""}`}>
            {children}
        </div>
    );
};

export default Card;
