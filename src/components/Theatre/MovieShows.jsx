import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../Config/ApiCall';
import { useParams } from 'react-router-dom';

function MovieShows() {
    const [allShows, setAllShows] = useState([]);
    const { date } = useParams()

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
        setAllShows(movieshows.data.shows);
        console.log(allShows);

    }
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-4">Movie Shows</h2>
                    <input
                        type="date"
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                        onChange={(e) => setInputDate(e.target.value)}
                    />
                    <button className="w-full p-3 mt-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transform hover:scale-105 transition-transform duration-200"

                    >
                        Get Shows Here
                    </button>
                </div>
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-8">
                    <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold"></h3>
                            <p className="text-gray-600"></p>
                        </div>
                        {/* Repeat the above div for each showtime */}
                    </div>
                </div>
            </div>


        </>
    )
}

export default MovieShows