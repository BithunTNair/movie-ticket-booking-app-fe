import React from 'react'
import { useNavigate } from 'react-router-dom'


function Card({ moviedata }) {
    const navigate = useNavigate();
    const getTheatre = (movieid) => {
        navigate(`/theatrebymovie/${movieid}`)
    }
    return (
        <>
            <div className="max-w-xs rounded-lg overflow-hidden shadow-lg cursor-pointer bg-white hover:bg-blue-400 transform hover:scale-105 transition-transform duration-300">
                {/* Image or Icon Section */}
                <div className="relative">
                    <img
                        className="w-full h-64 object-cover"
                        src={moviedata.poster}
                        alt="Card Image"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <h3 className="text-white text-lg font-bold">{moviedata.title} </h3>
                        <p className="text-gray-300 text-sm">{moviedata.genre} </p>
                    </div>
                </div>

                {/* Info Section */}
                {/* <div className="p-4">
                <p className="text-gray-600 text-base">
                   {moviedata?.description}
                </p>
            </div> */}

                {/* Action Button */}
                <div className="p-4 border-t border-gray-200 hover:bg-cyan-500">
                    <button className="w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-red-300"
                        onClick={() => getTheatre(moviedata._id)}  >
                        Book Now
                    </button>
                </div>
            </div>

        </>
    )
}

export default Card