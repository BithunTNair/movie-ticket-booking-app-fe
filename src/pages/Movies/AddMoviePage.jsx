import React from 'react'
import NavbarCom from '../../components/common/Navbar'
import AddMovies from '../../components/AddMovies'

function AddMoviePage() {
  return (
    <div className='dark:bg-stone-900'>
        <NavbarCom/>
        <AddMovies/>
    </div>
  )
}

export default AddMoviePage