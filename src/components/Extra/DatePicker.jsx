import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import NavbarCom from '../common/Navbar';

function DatePicker() {
    const [inputDate, setInputDate] = useState('');
    const navigate = useNavigate();
    const { id } = useParams()
    return (
        <>
            <NavbarCom/>
            <div className="min-h-screen bg-gray-100  dark:bg-zinc-950 flex flex-col items-center p-6">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">Select a date for getting shows</h2>
                    <input
                        type="date"
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                        onChange={(e) => setInputDate(e.target.value)}
                    />
                    <button className="w-full p-3 mt-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transform hover:scale-105 transition-transform duration-200"
                        onClick={() => navigate(`/theatrebymovie/dateselect/${id}/${inputDate}`)}
                    >
                        Get Shows Here
                    </button>
                </div>
                {/* <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-8">
            <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold">Movie: Movie Title</h3>
                    <p className="text-gray-600">Showtime: Date at Time</p>
                </div>
              
            </div>
        </div> */}
            </div>


        </>
    )
}

export default DatePicker