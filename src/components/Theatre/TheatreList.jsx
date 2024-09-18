import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../Config/ApiCall';
import { useNavigate } from 'react-router-dom';
import TheatreSeats from './TheatreSeats';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../Redux/generalSlice';
import Input from '../common/Input'

function TheatreList() {
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.user);
    const navigate = useNavigate()
    const [theatres, setTheatres] = useState([]);
    const [searchedTerm, setSearchedTerm] = useState('')
    useEffect(() => {
        getTheatres();

    }, []);

    const getTheatres = async () => {
        try {
            dispatch(setLoader(true))
            const theateData = await AxiosInstance({
                url: '/users/theatrelist',
                method: 'GET'
            });
            setTheatres(theateData.data.theatres);
            dispatch(setLoader(false))
        } catch (error) {
            console.log(error);
            dispatch(setLoader(false))
        }
    }
    const handleId = (id) => {
        navigate(`/theatres/dateselect/${id}`)
    };
    const theatreId = (id) => {
        navigate(`/theatres/addshows/${id}`)
    };
    const removeAllShows = async (theatreid) => {
        try {
            await AxiosInstance({
                url: `/admin/deleteallshows/${theatreid}`,
                method: 'DELETE'

            });
            getTheatres();
        } catch (error) {
            console.log(error);

        }
    }
    const searchedValue = (e) => {
        setSearchedTerm(e.target.value);


    }
    const searchedTheatre = theatres.filter((element) => element.name.toLowerCase().includes(searchedTerm.toLowerCase()));


    return (
        <>
            <div className='bg-slate-50 dark:bg-black min-h-screen min-w-screen'>
                <input
                    className="w-full max-w-md px-4 py-2 border mt-3 ml-4 border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search Theatre"
                    onChange={searchedValue}
                />
                {searchedTheatre.length > 0 ? searchedTheatre.map((element, index) => {

                    return <div className="flex flex-col space-y-6 p-4 mt-3 bg-gray-100 dark:bg-blue-800 rounded-lg shadow-lg transform hover:scale-95 transition-transform duration-300 cursor-pointer hover:bg-indigo-300" key={index}>
                        {/* Theatre Item */}
                        <div className="flex justify-between items-center p-4 bg-white dark:bg-black rounded-lg shadow-md hover:bg-indigo-500 transition-all duration-300">
                            {/* Theatre Info */}
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-gray-800 dark:text-white">{element.name}</span>
                                <span className="text-sm text-gray-500 dark:text-white">{element.location} </span>
                            </div>
                            {/* Theatre Actions */}
                            <div className="flex space-x-3">
                                <button className="px-2 py-1 md:px-4 md:py-2 text-wrap sm:text-nowrap  text-white bg-green-500 rounded-md shadow hover:bg-green-600 transition-colors duration-300" onClick={() => handleId(element._id)}>View</button>
                                {user.role === 1 && <button className="px-2 py-1 sm:text-nowrap md:px-4 md:py-2 text-white bg-yellow-500 rounded-md shadow hover:bg-yellow-600 transition-colors duration-300" onClick={() => theatreId(element._id)}> Add Shows</button>}
                                {user.role === 1 && <button className="px-2 py-1  text-wrap sm:text-nowrap md:px-4 md:py-2 text-white bg-red-500 rounded-md shadow hover:bg-red-600 transition-colors duration-300" onClick={() => removeAllShows(element._id)}> Remove all Shows</button>}
                            </div>


                        </div>
                    </div>

                }) : <p className='text-black dark:text-white text-3xl mt-10 ml-4 font-medium'>Sorry No Theatre is found</p>}

            </div>

        </>
    )
}

export default TheatreList