import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthPage from '../pages/AuthPage/AuthPage'
import Home from '../pages/Home/Home'
import LogIn from './Authentication/LogIn'
import AddMovies from './AddMovies'
import AddTheatre from './AddTheatre'
import MovieList from '../pages/Movies/MovieList'
import TheatrePage from '../pages/TheatrePage/TheatrePage'
import TheatreSeatPage from '../pages/TheatreSeats/TheatreSeatPage'
import TheatreSeats from './Theatre/TheatreSeats'
import Addshows from './Theatre/Addshows'
import MovieShows from './Theatre/MovieShows'
import DateSelect from './Theatre/DateSelect'


function Routing() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<AuthPage />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/movielist' element={<MovieList />} />
                <Route path='/theatres' element={<TheatrePage />} />
                <Route path='/theatres/dateselect/:id' element={<DateSelect />} />
                <Route path='/theatres/dateselect/:id/:date' element={<MovieShows />} />
                <Route path='/theatres/dateselect/:id/:date/:showsid' element={<TheatreSeats />} />
                <Route path='/theatres/addshows/:id' element={<Addshows />} />
                <Route path='/addmovies' element={<AddMovies />} />
                <Route path='/addtheatre' element={<AddTheatre />} />
            </Routes>

        </div>
    )
}

export default Routing