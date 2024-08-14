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
  return (
    <div>
            <button >ChangeTheme</button>
          
            <div className='dark:bg-blue-600 w-44 h-44 bg-slate-800'></div>
        </div>
  )
}

export default Theme