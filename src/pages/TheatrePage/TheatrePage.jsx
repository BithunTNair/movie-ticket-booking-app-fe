import React from 'react'
import TheatreList from '../../components/Theatre/TheatreList'
import NavbarCom from '../../components/common/Navbar'

function TheatrePage() {
  return (
    <>
      <div className=''>
        <div className=''>
          <NavbarCom />
        </div>

        <TheatreList />
      </div>
    </>
  )
}

export default TheatrePage