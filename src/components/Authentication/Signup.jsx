import React from 'react'
import Input from '../common/Input'
import { useForm } from "react-hook-form"

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(watch("example"))
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form  onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-4">
            <div>
             
              <Input type={'text'} placeholder={'First Name'} {...register("firstName")}/>
            </div>
            <div>
             
              <Input type={'text'} placeholder={'Last Name'}{...register("lastName")}  />
            </div>
            <div>
             
              <Input type={'email'} placeholder={'Email'}{...register("email")}/>
            </div>
            <div>
             
              <Input type={'Number'} placeholder={'Mobile Number'}{...register("mobileNumber")}  />
            </div>
            <div>
              
              <Input type={'password'} placeholder={'Password'}{...register("password")} />
            </div>
            <div>
              
              <Input type={'password'} placeholder={'Confirm Password'}{...register("password")}/>
            </div>
            <div>
             
              <Input type={'submit'}  />
            </div>
            {/* <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign Up
            </button> */}
            

          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup