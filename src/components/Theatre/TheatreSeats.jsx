import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../Config/ApiCall';
import { useParams } from 'react-router-dom';

function TheatreSeats() { 
    const [seats, setSeats] = useState([]);
    const { showsId } = useParams();

    useEffect(() => {
        getSeats()
    }, [showsId]);

    const getSeats = async () => {
        try {
            const theatreSeats = await AxiosInstance({
                url: `/users/getseats/${showsId}`, 
                method: 'GET',
            });
            setSeats(theatreSeats.data.seats);
        } catch (error) {
            console.error("Error fetching seats:", error);
        }
    };

    return (
        <>
            <div className=" min-h-screen grid grid-cols-5 sm:grid-cols-10 md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-10 gap-7 p-2 bg-red-300">
                {seats.map((element, index) => (
                    <div
                        key={index}
                        className="ml-9 flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 border border-gray-300 rounded-lg shadow hover:border-gray-950 hover:bg-yellow-500 hover:text-white transform hover:scale-125  transition-all duration-300 cursor-pointer"
                    >
                        {element.seatNumber}
                    </div>
                ))}
            </div>

        </>
    );
}

export default TheatreSeats;
