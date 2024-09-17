import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../Config/ApiCall';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../Redux/generalSlice';

function TheatrebyMovie() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [theatres, setTheatres] = useState([]);
    const [filteredTheatre, setFilteredTheatre] = useState([]);
    const { movieid } = useParams();
    const { user } = useSelector(store => store.user)
    useEffect(() => {
        getTheatrebyMovie()
    }, [movieid]);
    const getTheatrebyMovie = async () => {
        try {
            dispatch(setLoader(true))
            const response = await AxiosInstance({
                url: '/users/theatrelist',
                method: 'GET'
            });
            const alltheatres = response.data.theatres
            setTheatres(alltheatres);
            dispatch(setLoader(false))

        } catch (error) {
            console.log(error);
            dispatch(setLoader(true))
        };

    };
    useEffect(() => {
        if (theatres.length > 0) {
            const filter = theatres.filter(element => element.showtimes.some(showtime => showtime.movie === movieid));
            setFilteredTheatre(filter);
        }
    }, [theatres, movieid]);
    const handleId = (id) => {
        navigate(`/theatrebymovie/${movieid}/${id}`)
    };
    const addshows=(id)=>{
        navigate(`/theatrebymovie/${movieid}/addshows/${id}`)
    }
    return (
        <>
            {filteredTheatre.length > 0 ? filteredTheatre.map((theatre, index) => {

                return <div className="flex flex-col space-y-6 p-4 bg-gray-100 dark:bg-blue-800 rounded-lg shadow-lg transform hover:scale-95 transition-transform duration-300 cursor-pointer hover:bg-indigo-300" key={index}>
                    {/* Theatre Item */}
                    <div className="flex justify-between items-center p-4 bg-white dark:bg-black rounded-lg shadow-md hover:bg-indigo-500 transition-all duration-300">
                        {/* Theatre Info */}
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-800 dark:text-white">{theatre.name}</span>
                            <span className="text-sm text-gray-500 dark:text-white">{theatre.location} </span>
                        </div>
                        {/* Theatre Actions */}
                        <div className="flex space-x-3">
                            <button className="px-4 py-2 text-white bg-green-500 rounded-md shadow hover:bg-green-600 transition-colors duration-300" onClick={() => handleId(theatre._id)} >View</button>
                            {user.role === 1 && <button className="px-4 py-2 text-white bg-yellow-500 rounded-md shadow hover:bg-yellow-600 transition-colors duration-300" onClick={()=>addshows(theatre._id)} > Add Shows</button>}
                        </div>
                    </div>
                </div>

            }) : (<p>No theatres available for this movie.</p>)}
        </>
    )
}

export default TheatrebyMovie