import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../Config/ApiCall';
import { useNavigate } from 'react-router-dom';
import TheatreSeats from './TheatreSeats';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../Redux/generalSlice';

function TheatreList() {
const dispatch=useDispatch()
    const { user } = useSelector(store => store.user);
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()
    const [theatres, setTheatres] = useState([]);
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
    const theatreId=(id)=>{
        navigate(`/theatres/addshows/${id}`)
    }

    return (
        <>
            {theatres.map((element, index) => {

                return <div className="flex flex-col space-y-6 p-4 bg-gray-100 dark:bg-blue-800 rounded-lg shadow-lg transform hover:scale-95 transition-transform duration-300 cursor-pointer hover:bg-indigo-300" key={index}>
                    {/* Theatre Item */}
                    <div className="flex justify-between items-center p-4 bg-white dark:bg-black rounded-lg shadow-md hover:bg-indigo-500 transition-all duration-300">
                        {/* Theatre Info */}
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-800 dark:text-white">{element.name}</span>
                            <span className="text-sm text-gray-500 dark:text-white">{element.location} </span>
                        </div>
                        {/* Theatre Actions */}
                        <div className="flex space-x-3">
                            <button className="px-4 py-2 text-white bg-green-500 rounded-md shadow hover:bg-green-600 transition-colors duration-300" onClick={() => handleId(element._id)}>View</button>
                            {user.role === 1 && <button className="px-4 py-2 text-white bg-yellow-500 rounded-md shadow hover:bg-yellow-600 transition-colors duration-300" onClick={() =>theatreId(element._id)}> Add Shows</button>}
                        </div>
                    </div>
                </div>

            })}
            {modal && <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4">
                <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
                    <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        onClick={() => setModal(false)}
                    >
                        {/* Close Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <div className="p-6">
                        {/* Modal Content */}
                        <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
                        <p className="text-gray-700 mb-6">This is the content of the modal</p>
                        {/* Close Button */}
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"

                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default TheatreList