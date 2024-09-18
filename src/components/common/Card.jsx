import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import AxiosInstance from '../../Config/ApiCall';
import { setLoader } from '../../Redux/generalSlice';


function Card({ moviedata }) {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const [movieBox, setMovieBox] = useState([]);
    const getTheatre = (movieid) => {
        navigate(`/theatrebymovie/${movieid}`)
    };

    const getAllMovies = async () => {
        try {
            const movie = await AxiosInstance({
                url: '/users/movielist',
                method: 'GET'
            })
            setMovieBox(movie.data.movies);
        } catch (error) {
            console.log(error);

        }
    }
    const removeMovie = (movieId) => {
        try {
            dispatch(setLoader(true))
            AxiosInstance({
                url: `admin/deletemovie/${movieId}`,
                method: 'DELETE'
            });
            dispatch(setLoader(false));
            getAllMovies()
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <>
            <div className="max-w-xs rounded-lg overflow-hidden shadow-lg cursor-pointer bg-white hover:bg-blue-400 transform hover:scale-105 transition-transform duration-300 mt-10">
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
                <div className="p-4 border border-gray-200 hover:bg-slate-950 dark:hover:bg-fuchsia-400">
                    <button className="w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-red-300"
                        onClick={() => getTheatre(moviedata._id)}  >
                        Book Now
                    </button>
                    {user.role === 1 && <button className="w-full text-center bg-red-600 mt-4 text-white py-2 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-red-300"
                        onClick={() => removeMovie(moviedata._id)}  >
                        Remove
                    </button>}
                </div>
            </div>

        </>
    )
}

export default Card