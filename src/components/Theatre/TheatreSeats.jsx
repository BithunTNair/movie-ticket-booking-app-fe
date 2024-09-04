import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../Config/ApiCall';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { successToast } from '../../Plugins/Toast';

function TheatreSeats() {
    const [seats, setSeats] = useState([]);
    const { showsid, id } = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [movieId, setMovieId] = useState('');
    const { user } = useSelector(store => store.user)



    // const [seatisSelected, setseatisSelected] = useState(false)


    useEffect(() => {
        getSeats();
        getMovieforThisShow();
    }, [showsid]);

    const getSeats = async () => {
        try {
            const response = await AxiosInstance({
                url: `/users/getseatsbyshow/${showsid}`,
                method: 'GET',
            });

            const movieSeats = response.data.movieseats;
            const seatsArray = movieSeats[0].getseats;
            setSeats(seatsArray)

        } catch (error) {
            console.error("Error fetching seats:", error);
        }

    };
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

    }
    const selectSeats = (seatNumber) => {
        setSelectedSeats([...selectedSeats, seatNumber]);
        // setseatisSelected(!seatisSelected)
        console.log(selectedSeats);



    }
    // function loadScript(src) {
    //     return new Promise((resolve) => {
    //         const script = document.createElement("script");
    //         script.src = src;
    //         script.onload = () => {
    //             resolve(true);
    //         };
    //         script.onerror = () => {
    //             resolve(false);
    //         };
    //         document.body.appendChild(script);
    //     });
    // }

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
            <div className=" min-h-screen grid grid-cols-5 sm:grid-cols-10 md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-10 gap-7 p-2 bg-white">
                {seats.map((seat, index) => (
                    <div
                        key={index}

                        onClick={() => selectSeats(seat.seatNumber)}
                        className='ml-9 flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 bg-white border border-green-500 rounded-lg shadow hover:border-green-800 hover:bg-yellow-500 hover:text-white transform hover:scale-125  transition-all duration-300 cursor-pointer'
                    >

                        {seat.seatNumber}

                    </div>
                ))}
                <div className=''>
                    <button className='bg-green-400 border rounded text-white p-4 lg:transform lg:hover scale-105 transition-transform duration-300' onClick={displayRazorpay} >Book Now</button>
                </div>
            </div>

        </>
    );
}

export default TheatreSeats;
