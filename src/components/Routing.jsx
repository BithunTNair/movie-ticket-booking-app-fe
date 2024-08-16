import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthPage from '../pages/AuthPage/AuthPage'
import Home from '../pages/Home/Home'
import LogIn from './Authentication/LogIn'
import Movies from './Movies'
import Theatres from './Theatres'
import TheatreSeats from './TheatreSeats'
import AddMovies from './AddMovies'
import AddTheatre from './AddTheatre'


function Routing() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<AuthPage />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/movies' element={<Movies />} />
                <Route path='/theatres' element={<Theatres />} />
                <Route path='/theatreseats' element={<TheatreSeats />} />
                <Route path='/addmovies' element={<AddMovies />} />
                <Route path='/addtheatre' element={<AddTheatre />} />
            </Routes>

        </div>
    )
}

export default Routing