import React from 'react'
import Input from '../common/Input'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { errorToast } from '../../Plugins/Toast';
import { successToast } from '../../Plugins/Toast';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/userSlice';
import { setLoader } from '../../Redux/generalSlice';
import img1 from '../../background-images/movie2.jpg'


function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    dispatch(setLoader(true));
    try {
      axios({
        url: `${import.meta.env.VITE_BASE_URL}/auth/signin`,
        method: "POST",
        data: data
      }).then((response) => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        dispatch(setUser(response.data.user));
        successToast('signed in successfully');
        dispatch(setLoader(false));
        navigate('/home', { replace: true });
       
      }).catch((err) => {
        console.log(err.response.data);
        errorToast('Invalid Credentials');
        dispatch(setLoader(false));
      
      })
    } catch (error) {
      console.log(error);
      errorToast('something went wrong');
      dispatch(setLoader(false));
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-700 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${img1})` }}>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md transform hover:scale-110 transition-transform duration-300" style={{backgroundImage:`url(${img1})`}}>
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Log In</h2>
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
                className="w-full bg-pink-300 text-white py-2 rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-110 transition-transform duration-300"
              >
                Log In
              </button>
            </div>
          </div>
        </form>
        <p className='font-medium text-white' >Don't have an account ? <i className=' text-blue-500 hover:underline	cursor-pointer font-medium' onClick={() => navigate('/')
        } >Sign Up</i> </p>
      </div>
    </div>
  )
}

export default LogIn