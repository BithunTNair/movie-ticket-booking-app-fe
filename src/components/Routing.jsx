import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthPage from '../pages/AuthPage/AuthPage'
import Home from '../pages/Home/Home'
import LogIn from './Authentication/LogIn'
import AddTheatre from './AddTheatre'
import MovieList from '../pages/Movies/MovieList'
import TheatrePage from '../pages/TheatrePage/TheatrePage'
import TheatreSeats from './Theatre/TheatreSeats'
import Addshows from './Theatre/Addshows'
import MovieShows from './Theatre/MovieShows'
import DateSelect from './Theatre/DateSelect'
import AddMoviePage from '../pages/Movies/AddMoviePage'
import ReviewPage from '../pages/ReviewPage/ReviewPage'
import TheatrebyMovie from './Theatre/TheatrebyMovie'
import DatePicker from './Extra/DatePicker'
import ShowTimes from './Extra/ShowTimes'
import Seats from './Extra/Seats'
import OwnerAuth from '../pages/OwnerAuthPage/OwnerAuth'
import OwnerSignin from './OwnerAuth/OwnerSignin'
import User from './user-collection/User'
import Owners from './user-collection/Owners'


function Routing() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<AuthPage />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/ownerlogin' element={<OwnerSignin />} />
                <Route path='/dashboard' element={<OwnerAuth />} />
                <Route path='/users' element={<User/>} />
                <Route path='/owners' element={<Owners/>} />
                <Route path='/movielist' element={<MovieList />} />
                <Route path='/movielist' element={<MovieList />} />
                <Route path='/theatres' element={<TheatrePage />} />
                <Route path='/theatres/dateselect/:id' element={<DateSelect />} />
                <Route path='/theatres/dateselect/:id/:date' element={<MovieShows />} />
                <Route path='/theatres/dateselect/:id/:date/:showsid' element={<TheatreSeats />} />
                <Route path='/theatres/addshows/:id' element={<Addshows />} />
                <Route path='/addmovies' element={<AddMoviePage />} />
                <Route path='/addtheatre' element={<AddTheatre />} />
                <Route path='/reviews&ratings' element={<ReviewPage />} />
                <Route path='/theatrebymovie/:movieid' element={<TheatrebyMovie/>} />
                <Route path='/theatrebymovie/:movieid/:theatreid' element={<DatePicker/>} />
                <Route path='/theatrebymovie/:movieid/:theatreid/:date' element={<ShowTimes/>} />
                <Route path='/theatrebymovie/:movieid/:theatreid/:date/:showsid' element={<Seats/>} />
                <Route path='/theatrebymovie/:movieid/addshows/:id' element={<Addshows/>} />
              
            </Routes>

        </div>
    )
}

export default Routing