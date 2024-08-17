import React from 'react'
import './Loader.css'

function Loader() {
    return (
        <div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                <div className="relative">
                    <div className="w-12 h-12 border-t-4 border-b-4 border-white rounded-full animate-spin loader-gradient"></div>
                   
                </div>
            </div>
        </div>
    )
}

export default Loader