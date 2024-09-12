import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import AxiosInstance from '../../Config/ApiCall';
import { useSelector } from 'react-redux';


function ReviewComponent() {
    const { user } = useSelector(store => store.user);
    const userId = user._id;
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        getReviews()
    }, []);


    const getReviews = async () => {
        try {
            const response = await AxiosInstance({
                url: '/users/getreviews',
                method: 'GET'
            });
            const review = response.data.reviews;
            const reversedArray = review.reverse()
            setReviews(reversedArray)

        } catch (error) {
            console.log(error);

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
    }
    return (
        <div>
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


                {reviews.map((element) => {
                    return <div className="mt-8">

                        <div className="bg-gray-100 dark:bg-stone-900 p-4 rounded-lg shadow-md mb-4">
                            <div className="flex justify-between items-center">
                                <div className=''>
                                    <h3 className="fon-bold text-2xl text-black dark:text-stone-50">{element.user.firstName + ' ' + element.user.lastName} </h3>
                                    <p className="text-black dark:text-white font-thin mt-5">
                                        {element.review}
                                    </p>
                                    <button className='bg-yellow-200'>Edit</button>
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
        </div>

    )
}

export default ReviewComponent