import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthPage from '../pages/AuthPage/AuthPage'
import Home from '../pages/Home/Home'
import LogIn from './Authentication/LogIn'
import Theatres from './Theatres'
import TheatreSeats from './TheatreSeats'
import AddMovies from './AddMovies'
import AddTheatre from './AddTheatre'
import MovieList from '../pages/Movies/MovieList'
import TheatreList from './Theatre/TheatreList'


function Routing() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<AuthPage />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/movielist' element={<MovieList />} />
                <Route path='/theatres' element={<TheatreList />} />
                <Route path='/theatreseats' element={<TheatreSeats />} />
                <Route path='/addmovies' element={<AddMovies />} />
                <Route path='/addtheatre' element={<AddTheatre />} />
            </Routes>

        </div>
    )
}

export default Routing