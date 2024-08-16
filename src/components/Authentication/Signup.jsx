import React from 'react'
import Input from '../common/Input'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../Plugins/Toast';


function Signup() {
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
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_BASE_URL}/auth/signup`,
        method: 'POST',
        data: data
      }).then((response) => {
        console.log(response.data);
        successToast('Signup successfull')
        navigate('/login')

      }).catch((err) => {
        console.log(err.response.data);
        errorToast('Something went wrong')
      })
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-700 bg-cover bg-center bg-no-repeat "   style={{ backgroundImage: "url('https://img.freepik.com/free-photo/movie-background-collage_23-2149876003.jpg?size=626&ext=jpg&ga=GA1.1.1787796043.1706771541&semt=ais_hybrid')" }}>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
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
              <Input type={'password'} placeholder={'Password'}{...register("password")} />
              <p className='text-red-400'>{errors.password?.message}</p>
            </div>
            <div>
              <Input type={'password'} placeholder={'Confirm Password'}{...register("password")} />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg shadow-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
        <p className='font-medium'>Already have an account  <i className='text-blue-500 hover:underline	cursor-pointer font-medium' onClick={() => navigate('/login')} >LogIn</i> </p>
      </div>
    </div>
  )
}

export default Signup