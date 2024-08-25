import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../Config/ApiCall';

function TheatreSeats({theatreId}) {
    const [seats, setSeats] = useState([]);
    useEffect(() => {
        getSeats(theatreId)
    }, []);

    const getSeats = async (id) => {
        const theatreSeats = await AxiosInstance({
            url:  `/users/getseats/${id}`,
            method: 'GET'
        });
        setSeats(theatreSeats.data.seats);


    }


    return (

        <>
            <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-10 gap-2 p-4">
               
                {seats.map((element, index) => {
                    return <div key={index} className="flex justify-center items-center w-10 h-10 bg-gray-200 border border-gray-300 rounded-lg shadow hover:bg-yellow-500 hover:text-white transition-all duration-300 cursor-pointer">
                        {element.seatNumber}
                    </div>
                })}
            </div>

        </>
    )
}

export default TheatreSeats