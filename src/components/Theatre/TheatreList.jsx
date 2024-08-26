import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../Config/ApiCall';
import { useNavigate } from 'react-router-dom';
import TheatreSeats from './TheatreSeats';

function TheatreList() {
    const navigate = useNavigate()
    const [theatres, setTheatres] = useState([]);
    useEffect(() => {
        getTheatres()
    }, []);

    const getTheatres = async () => {
        const theateData = await AxiosInstance({
            url: '/users/theatrelist',
            method: 'GET'
        });
        setTheatres(theateData.data.theatres)
    }
    const handleId = (id) => {
        navigate(`/theatres/theatreseats/${id}`)
    }

    return (
        <>
            {theatres.map((element, index) => {

                return <div className="flex flex-col space-y-6 p-4 bg-gray-100 rounded-lg shadow-lg transform hover:scale-95 transition-transform duration-300 cursor-pointer hover:bg-indigo-300" key={index}>
                    {/* Theatre Item */}
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:bg-indigo-500 transition-all duration-300">
                        {/* Theatre Info */}
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-800 ">{element.name}</span>
                            <span className="text-sm text-gray-500">{element.location} </span>
                        </div>
                        {/* Theatre Actions */}
                        <div className="flex space-x-3">
                            <button className="px-4 py-2 text-white bg-green-500 rounded-md shadow hover:bg-green-600 transition-colors duration-300" onClick={() => handleId(element._id)}>View</button>

                        </div>
                    </div>
                </div>
            })}

        </>
    )
}

export default TheatreList