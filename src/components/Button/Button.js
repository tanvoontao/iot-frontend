import { useState } from 'react';
import styles from './Button.module.css';

export default function Button({ children, onClick }) {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        setIsAnimating(true);
        if (onClick) {
            onClick();
        }
        setTimeout(() => {
            setIsAnimating(false);
        }, 600);
    };

    return (
        <button
            className={`${styles.button} ${isAnimating ? styles.animate : ''} rounded px-6 py-2 text-gray1 font-bold`}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}
