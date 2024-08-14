import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthPage from '../pages/AuthPage/AuthPage'
import Home from '../pages/Home/Home'


function Routing() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<AuthPage />} />
                <Route path='/home' element={<Home/>} />
            </Routes>

        </div>
    )
}

export default Routing