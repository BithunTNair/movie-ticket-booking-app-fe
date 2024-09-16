import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../Config/ApiCall';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { errorToast, successToast } from '../../Plugins/Toast';
import NavbarCom from '../common/Navbar';
import { setLoader } from '../../Redux/generalSlice';

function TheatreSeats() {
    const dispatch=useDispatch()
    const [seats, setSeats] = useState([]);
    const { showsid, id, date } = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [movieId, setMovieId] = useState('');
    const [modal, setModal] = useState(false);
    const [theatre, setTheatre] = useState([]);
    const [movieData, setMovieData] = useState([]);
    const[showtime,setShowtime]=useState([]);
    const { user } = useSelector(store => store.user);


    useEffect(() => {
        getSeats();
        getMovieforThisShow();
    }, [showsid]);

    useEffect(() => {
        getTheatre();
        getShowtime()

    }, []);
    console.log(date);

    const getTheatre = async () => {
        try {
            const response = await AxiosInstance({
                url: '/users/singletheatre',
                method: 'GET',
                params: {
                    theatreId: id
                }
            });
            setTheatre(response.data.theatre);


        } catch (error) {
            console.log(error);

        }
    };

    const getMoviebyId = async (movieRes) => {
        try {
            const response = await AxiosInstance({
                url: '/users/singlemovie',
                method: 'GET',
                params: {
                    movieDataId: movieRes
                }
            });
            setMovieData(response.data.movie);
        } catch (error) {
            console.log(error);
        }
    }

    const getSeats = async () => {
        try {
            dispatch(setLoader(true))
            const response = await AxiosInstance({
                url: `/users/getseatsbyshow/${showsid}`,
                method: 'GET',
            });

            const movieSeats = response.data.movieseats;
            const seatsArray = movieSeats[0].getseats;
            setSeats(seatsArray);
            dispatch(setLoader(false))

        } catch (error) {
            console.log(error);
            dispatch(setLoader(false))
        }

    };
    const getShowtime = async () => {
        try {
            const show = await AxiosInstance({
                url: '/users/displayshowtime',
                method: 'GET',
                params: {
                    showId: showsid
                }
            });
            setShowtime(show.data.message);
            console.log(showtime);
            
        } catch (error) {
            console.log(error);

        }
    }
    const getMovieforThisShow = async () => {
        const movieData = await AxiosInstance({
            url: '/users/getmoviebyshow',
            method: 'GET',
            params: {
                showId: showsid
            }
        });
        const preMovieid = movieData.data.message;
        const movieRes = preMovieid[0].movie
        setMovieId(movieRes);
        console.log(movieId);
        getMoviebyId(movieRes);

    };

    const selectordeSelectSeats = (seatNumber) => {
        if (selectedSeats.find((number) => number === seatNumber)) {
            const temp = selectedSeats.filter((number) => number !== seatNumber);
            setSelectedSeats(temp)
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
        console.log(selectedSeats);
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await AxiosInstance.post("/payments/orders", { showId: showsid, seats: selectedSeats, theatreId: id, movieId: movieId });
        console.log(result);

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency, receipt } = result.data;

        const options = {
            key: `${import.meta.env.VITE_RP_KEY_ID}`,
            amount: amount.toString(),
            currency: currency,
            name: "Tap Tickets Online",
            description: "Booking Seats",
            image: null,
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    receipt,
                    theatreId: id,
                    showId: showsid,
                    movieId: movieId,
                    seats: selectedSeats
                };

                const result = await AxiosInstance.post("/payments/verify", data);

                // alert(result.data.msg);
                successToast('Booking was completed');
                getSeats();
                setSelectedSeats([]);
                setModal(false)
            },
            prefill: {
                name: user.firstName,
                email: user.email,
                contact: '9999999999',
            },
            // notes: {
            //     address: "Soumya Dey Corporate Office",
            // },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    };
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    return (
        <>
        <NavbarCom/>
            <div className=" min-h-screen grid grid-cols-5 sm:grid-cols-10 md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-10 gap-7 p-2 bg-white dark:bg-zinc-900">
                {seats.map((seat, index) => (
                    <div
                        key={index}

                        onClick={() => selectordeSelectSeats(seat.seatNumber)}
                        className={`${selectedSeats.find((number) => number === seat.seatNumber)
                            ? 'ml-9 flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 bg-green-400 border border-green-500 rounded-lg shadow hover:border-green-800  transform hover:scale-125 transition-all duration-300 cursor-pointer'
                            : seat.isBooked
                                ? 'ml-9 flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 bg-gray-500 dark:bg-red-500  dark:text-black border border-green-500 dark:border-white rounded-lg shadow hover:border-green-800 text-white  transform hover:scale-125 transition-all duration-300 cursor-pointer'
                                : 'ml-9 flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 bg-white border border-green-500 rounded-lg shadow hover:border-green-800  transform hover:scale-125 transition-all duration-300 cursor-pointer'}`}
                    >
                        {seat.seatNumber}
                    </div>
                ))}
                <div className=''>
                    <button className=' bg-green-400 border rounded text-white dark:text-black font-semibold p-2 lg:transform lg:hover scale-105 transition-transform duration-300' onClick={() => setModal(true)} >Book Now</button>
                </div>
            </div>
            {modal && <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4">
                <div className="relative bg-white dark:bg-zinc-900 rounded-lg shadow-lg w-full max-w-md mx-auto">
                    <button
                        className="absolute top-2 right-2 text-gray-600 dark:text-white hover:text-gray-800"
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
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white"> Date :{date} </h2>
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white"> Theatre Name : {theatre.name}</h2>
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white"> Show Time :{showtime[0].time }</h2>
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white"> Movie Title : {movieData.title}</h2>
                        <img src={movieData.poster} alt="" className='h-56' />
                        <h2 className="text-xl font-semibold mb-4 dark:text-white"> User : {user.firstName+' '+user.lastName}</h2>
                        <h2 className="text-xl font-semibold mb-4 dark:text-white"> Selected Seats : {selectedSeats.length>0? selectedSeats.join(', '):"No seats are selected"}</h2>
                        <p className="text-gray-700 mb-6 dark:text-white">This is the confirmation window before the payment</p>
                        {/* Close Button */}
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                            onClick={displayRazorpay}
                        >
                            Book
                        </button>

                    </div>
                </div>
            </div>}

        </>
    );
}

export default TheatreSeats;
