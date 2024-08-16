import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthPage from '../pages/AuthPage/AuthPage'
import Home from '../pages/Home/Home'
import LogIn from './Authentication/LogIn'


function Routing() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<AuthPage />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<LogIn />} />
            </Routes>

        </div>
    )
}

export default Routing