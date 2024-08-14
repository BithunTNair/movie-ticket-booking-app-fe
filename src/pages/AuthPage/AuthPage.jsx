import React from 'react'
import Signup from '../../components/Authentication/Signup'
import LogIn from '../../components/Authentication/LogIn'

function AuthPage() {
  return (
    <div className='min-w-screen min-h-screen'>
       
      
        <Signup/>
        <p>Already have an account <i>LogIn</i> </p>

    </div>
  )
}

export default AuthPage