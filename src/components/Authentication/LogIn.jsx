import React from 'react'
import Input from '../common/Input'

function LogIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
        <form>
          <div className="flex flex-col space-y-4">
           
           
            <div>

              <Input type={'email'} placeholder={'Email'} />
            </div>
           
            <div>

              <Input type={'password'} placeholder={'Password'} />
            </div>
          
            <div>

              <Input type={'submit'} placeholder={'Login'} />
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

export default LogIn