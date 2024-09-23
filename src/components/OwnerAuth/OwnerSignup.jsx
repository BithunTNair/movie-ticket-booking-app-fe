import React, { useState } from 'react'
import Input from '../common/Input'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../Plugins/Toast';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../Redux/generalSlice';
import img1 from '../../background-images/movie2.jpg'

function OwnerSignup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [securitycode, setSecuritycode] = useState(generateSecurityCode());
    console.log(securitycode);


    const schema = yup
        .object({
            firstName: yup.string().required(),
            lastName: yup.string().required(),
            mobileNumber: yup.string().matches(/^\d{10}$/).required(),
            email: yup.string().email().required(),
            password: yup.string().min(8).max(12).required(),
        })
        .required()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });

    function generateSecurityCode() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    const onSubmit = (data) => {
        if (data.securitycode !== String(securitycode)) {
            return errorToast('Invalid security code');
        }

        dispatch(setLoader(true));
        try {
            axios({
                url: `${import.meta.env.VITE_BASE_URL}/auth/ownersignup`,
                method: 'POST',
                data: data
            }).then((response) => {
                console.log(response.data);
                successToast('Signup successfull');
                setSecuritycode(generateSecurityCode());
                dispatch(setLoader(false))
                navigate('/ownerlogin', { replace: true });


            }).catch((err) => {
                console.log(err.response.data);
                errorToast('Something went wrong');
                dispatch(setLoader(false))
            })
        } catch (error) {
            console.log(error);
            errorToast('Something went wrong');
            dispatch(setLoader(false))
        }
    };

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${img1})` }} >
                <div className="w-full max-w-md bg-gray-50 dark:bg-zinc-900 p-8 rounded-lg shadow-md" style={{ backgroundImage: `url(${img1})` }} >
                    <h2 className="text-2xl text-white font-bold text-center mb-6">Owner Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <Input type={'text'} placeholder={'First Name'} {...register("firstName")} />
                                <p className='text-red-400'>{errors.firstName && 'First Name is required'}</p>
                            </div>
                            <div>
                                <Input type={'text'} placeholder={'Last Name'}{...register("lastName")} />
                                <p className='text-red-400'>{errors.lastName && 'Last Name is required'}</p>
                            </div>
                            <div>
                                <Input type={'email'} placeholder={'Email'}{...register("email")} />
                                <p className='text-red-400'>{errors.email && 'Email is required'}</p>
                            </div>
                            <div>
                                <Input type={'Number'} placeholder={'Mobile Number'}{...register("mobileNumber")} />
                                <p className='text-red-400'>{errors.mobileNumber && 'Mobile number must be exactly 10 digits'}</p>
                            </div>
                            <div>
                                <Input type={'text'} placeholder={'Security Code'}  {...register("securitycode")} />
                                <p className='text-red-400'>{errors.securitycode && 'Invalid security code'}</p>
                            </div>
                            <div>
                                <Input type={'password'} placeholder={'Password'}{...register("password")} />
                                <p className='text-red-400'>{errors.password?.message}</p>
                            </div>
                            <div>
                                <Input type={'password'} placeholder={'Confirm Password'}{...register("password")} />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full  text-white py-2 rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 ..."
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </form>
                    <p className='font-medium text-white '>Already have an account  <i className='text-blue-500 hover:underline	cursor-pointer font-medium' onClick={() => navigate('/ownerlogin')} >LogIn</i> </p>
                </div>
            </div>
        </>
    )
}

export default OwnerSignup