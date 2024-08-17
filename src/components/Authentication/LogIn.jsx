import React from 'react'
import Input from '../common/Input'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { errorToast } from '../../Plugins/Toast';
import { successToast } from '../../Plugins/Toast';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


function LogIn() {
  const navigate = useNavigate();
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().min(8).max(12).required()
    })
    .required()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    try {
      axios({
        url: `${import.meta.env.VITE_BASE_URL}/auth/signin`,
        method: "POST",
        data: data
      }).then((response) => {
        console.log(response.data);
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user))
        navigate('/home')


      }).catch((err) => {
        console.log(err.response.data);
        errorToast('Invalid Credentials');

      })
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-700 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/movie-background-collage_23-2149876003.jpg?size=626&ext=jpg&ga=GA1.1.1787796043.1706771541&semt=ais_hybrid')" }}>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="flex flex-col space-y-4">
            <div>
              <Input type={'email'} placeholder={'Email'}  {...register("email")} />
              <p className='text-red-400 font-medium'>{errors.email && 'Email is required'}</p>
            </div>
            <div>
              <Input type={'password'} placeholder={'Password'}  {...register("password")} />
              <p className='text-red-400 font-medium'>{errors.password && 'Enter your password'}</p>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-slate-700 text-white py-2 rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Log In
              </button>
            </div>
          </div>
        </form>
        <p className='font-medium' >Don't have an account ? <i className=' text-blue-500 hover:underline	cursor-pointer font-medium' onClick={() => navigate('/')
        } >Sign Up</i> </p>
      </div>
    </div>
  )
}

export default LogIn