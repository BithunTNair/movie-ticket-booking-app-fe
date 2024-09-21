import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import AxiosInstance from '../../Config/ApiCall';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../Redux/generalSlice';


function ReviewComponent() {
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.user);
    const userId = user._id;
    const [reviews, setReviews] = useState([]);
    const [modal, setModal] = useState(false);
    const [reviewid, setReviewid] = useState('');
    const [reviewData, setReviewData] = useState({
        review: '', 
        rating: ''
      });
    useEffect(() => {
        getReviews()
    }, []);


    const getReviews = async () => {
        try {
            dispatch(setLoader(true))
            const response = await AxiosInstance({
                url: '/users/getreviews',
                method: 'GET'
            });
            const review = response.data.reviews;
            const reversedArray = review.reverse()
            setReviews(reversedArray);
            dispatch(setLoader(false))

        } catch (error) {
            console.log(error);
            dispatch(setLoader(false))

        }
    };
    const deleteReview = async (id) => {
        try {
            dispatch(setLoader(true))
            const reviewId = id;
            await AxiosInstance({
                url: `/users/deletereviews/${reviewId}`,
                method: 'DELETE'
            });
            getReviews();
            dispatch(setLoader(false))

        } catch (error) {
            console.log(error);
            dispatch(setLoader(false))
        }
    }

    const schema = yup
        .object({
            review: yup.string().required(),
            rating: yup.number().required().min(1).max(5)
        })
        .required()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });
    const onSubmit = async (data) => {
        console.log(data);
        try {
            await AxiosInstance({
                url: `/users/addreviews/${userId}`,
                method: 'POST',
                data: data,
            });
            getReviews()
        } catch (error) {
            console.log(error);

        }
    };
    const getId = (revid) => {
        setReviewid(revid);
        console.log(reviewid);

        setModal(true)
    }
    const updateReview = async () => {
        try {
            await AxiosInstance({
                url: `/users/updatereviews/${reviewid}`,
                method: 'PUT',
                data:reviewData
            });
            getReviews();
            setModal(false);

        } catch (error) {
            console.log(error);
          

        }
    };
    const handleChange = (e) => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.value });
    }

    return (
        <div className='bg-black min-h-screen'>
            <div className="container mx-auto p-4 dark:bg-slate-900">
                {/* Review Input Section */}
                <div className="bg-white dark:bg-gray-500 p-4 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 ">
                            {/* Review Input */}
                            <input
                                type="text"
                                placeholder="Type your review here..."
                                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("review")}
                            />
                            {/* Rating Input */}
                            <input
                                type="number"
                                placeholder="Rating (1-5)"
                                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("rating")}
                            />

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 sm:w-auto w-full"
                            >
                                Submit Review
                            </button>
                        </div>
                        <div className="mt-5 text-red-400 ">
                            {/* Display validation errors if any */}
                            {errors.review && <p>Review is required</p>}
                            {errors.rating && <p>Rating is required and must be between 1 and 5</p>}

                        </div>
                    </form>
                </div>


                {reviews.map((element, index) => {
                    return <div className="mt-8" key={index} >

                        <div className="bg-gray-100 dark:bg-blue-900 p-4 rounded-lg shadow-md mb-4">
                            <div className="flex justify-between items-center">
                                <div className=''>
                                    <h3 className="fon-bold text-2xl text-black dark:text-stone-50">{element.user.firstName + ' ' + element.user.lastName} </h3>
                                    <p className="text-black dark:text-white font-thin mt-5">
                                        {element.review}
                                    </p>
                                    {element.user._id === user._id && <div >
                                        <button className='bg-yellow-200 hover:bg-yellow-500 text-white  dark:text-black font-bold py-2 px-4 rounded ' onClick={() => getId(element._id)} >Edit</button>
                                        <button className='bg-red-500 mt-5 ml-5  hover:bg-red-700 text-white dark:text-black font-bold py-2 px-4 rounded' onClick={() => deleteReview(element._id)}>Delete</button>
                                    </div>}
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-yellow-400 text-lg">&#9733;</span>
                                    <span className="font-semibold text-gray-700 dark:text-white">{element.rating} </span>
                                </div>
                            </div>
                        </div>


                    </div>
                })}
            </div>
            {modal && <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4 w-full">
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
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 ">
                            {/* Review Input */}
                            <input
                                type="text"
                                placeholder="Type your review here..."
                                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name='review'
                                value={reviewData.review}
                                onChange={handleChange}
                            />
                            {/* Rating Input */}
                            <input
                                type="number"
                                placeholder="Rating (1-5)"
                                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name='rating'
                                value={reviewData.rating}
                                onChange={handleChange}
                            />

                            {/* Submit Button */}

                        </div>
                        {/* Close Button */}

                        <button type='submit'
                            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 focus:outline-none"
                            onClick={updateReview}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>}
        </div>

    )
}

export default ReviewComponent