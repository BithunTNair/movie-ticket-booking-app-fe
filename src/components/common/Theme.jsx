import React, { useEffect, useState } from 'react'

function Theme() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === "dark"
    })
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode]);
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };
    return (
        <div>
            <button className='text-black dark:text-white font-bold' onClick={toggleTheme} >{darkMode ? ' Dark theme' :' Light theme'}</button>
        </div>
    )
}

export default Theme