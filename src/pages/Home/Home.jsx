import React from 'react'
import NavbarCom from '../../components/common/Navbar'
import Card from '../../components/common/Card'
import MovieList from '../Movies/MovieList';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer/Footer';

function Home() {
  const { user } = useSelector(store => store.user)
  return (
    <div>

      <NavbarCom />

      <div className='flex justify-center  dark:bg-neutral-900 flex-col min-h-screen'>
        <h2 className='text-black dark:text-white text-4xl font-serif ml-5'>Hello... {user.firstName} , Welcome to TapTickets Platform </h2>
        <p className='font-bold text-4xl dark:text-white justify-center mt-6 ml-5'>Book Your Tickets</p>
        <MovieList />
      </div>
      <div>
        <Footer/>
      </div>



    </div>
  )
}

export default Home