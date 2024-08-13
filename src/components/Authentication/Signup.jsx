import React from 'react'
import Input from '../common/Input'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


function Signup() {


  const schema = yup
    .object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      mobileNumber: yup.string().matches(/^\d{10}$/).required(),
      email: yup.string().email().required(),


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
        url: `${import.meta.env.VITE_BASE_URL}/auth/signup`,
        method: 'POST',
        data: data
      }).then((response) => {
        console.log(response.data);

      }).catch((err) => {
        console.log(err.response.data);

      })
    } catch (error) {
      console.log(error);

    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-4">
            <div>

              <Input type={'text'} placeholder={'First Name'} {...register("firstName")} />
              <p>{errors.firstName?.message}</p>

            </div>
            <div>

              <Input type={'text'} placeholder={'Last Name'}{...register("lastName")} />
              <p>{errors.lastName?.message}</p>
            </div>
            <div>

              <Input type={'email'} placeholder={'Email'}{...register("email")} />
              <p>{errors.email?.message}</p>
            </div>
            <div>

              <Input type={'Number'} placeholder={'Mobile Number'}{...register("mobileNumber")} />
              <p>{errors.mobileNumber && 'Mobile number must be exactly 10 digits'}</p>
            </div>
            <div>

              <Input type={'password'} placeholder={'Password'}{...register("password")} />
              <p>{errors.password?.message}</p>
            </div>
            <div>

              <Input type={'password'} placeholder={'Confirm Password'}{...register("password")} />
            </div>
            <div>

              <Input type={'submit'} />
            </div>


          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup