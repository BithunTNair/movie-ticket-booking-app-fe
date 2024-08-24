import React from 'react'
import NavbarCom from '../../components/common/Navbar'
import Card from '../../components/common/Card'
import MovieList from '../Movies/MovieList'

function Home() {
  return (
    <div>

      <NavbarCom />
    
       <div className='flex justify-center mt-10'>
       <p className='font-bold text-4xl'>Book Your Tickets</p>
       </div>
        <MovieList />
     

    </div>
  )
}

export default Home