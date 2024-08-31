import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../Config/ApiCall';
import { useNavigate, useParams } from 'react-router-dom';

function MovieShows() {
    const [filteredShows, setFilteredShows] = useState([]);
    const { date, id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {

        getAllShows()
    }, []);

    const getAllShows = async () => {
        const movieshows = await AxiosInstance({
            url: '/users/getshowsbydate',
            method: "GET",
            params: {
                showDate: date
            }
        });


        const filtered = movieshows.data.shows.filter((element) => element._id === id);
        setFilteredShows(filtered)

    };
    const handleId = (e) => {
        const showId = e.target.value;
        navigate(`/theatres/dateselect/${id}/${date}/${showId}`)
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6"  >
                <div className="w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-4">Movie Shows</h2>
                    <h2 className="text-2xl font-bold text-center mb-4">{date}</h2>

                    {/* <input
                        type="date"
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                        onChange={(e) => setInputDate(e.target.value)}
                    />
                    <button className="w-full p-3 mt-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transform hover:scale-105 transition-transform duration-200"

                    >
                        Get Shows Here
                    </button> */}
                </div>
                {filteredShows.map((element, index) => {
                    return <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-8" key={index} >
                        <div className="flex justify-between">
                            <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold">{element.showTimes.time} </h3>
                                <p className="text-gray-600">{''} </p>
                            </div>
                            <button className='bg-green-400 border rounded text-white p-4 lg:transform lg:hover scale-105 transition-transform duration-300' onClick={handleId} value={element.showTimes._id} >Book Now</button>
                        </div>
                    </div>
                })}
            </div>


        </>
    )
}

export default MovieShows