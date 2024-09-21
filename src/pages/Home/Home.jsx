import React, { useEffect, useState } from 'react'
import NavbarCom from '../../components/common/Navbar'
import Card from '../../components/common/Card'
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/Footer/Footer';
import AxiosInstance from '../../Config/ApiCall';
import { setLoader } from '../../Redux/generalSlice';

function Home() {
  const { user } = useSelector(store => store.user);
  const dispatch=useDispatch();
  const [movieBox, setMovieBox] = useState([]);
  useEffect(() => {
    getAllMovies()
  }, [])
  const getAllMovies = async () => {
    try {
      dispatch(setLoader(true))
      const movie = await AxiosInstance({
        url: '/users/movielist',
        method: 'GET'
      })
      setMovieBox(movie.data.movies);
      dispatch(setLoader(false))
    } catch (error) {
      console.log(error);
      dispatch(setLoader(false))

    }
  }
  return (
    <div>

      <NavbarCom />

      <div className='flex justify-center  dark:bg-neutral-900 flex-col min-h-screen'>
        <h2 className='text-black dark:text-white text-4xl font-serif ml-5 mt-10'>Hello... {user.firstName} , Welcome to TapTickets Platform </h2>
        <p className='font-bold text-4xl dark:text-white justify-center mt-6 ml-5'>Book Your Tickets</p>
        <div className='min-w-screen min-h-screen dark:bg-zinc-900 bg-white'>

          <div className=' min-w-screen-sm flex flex-wrap gap-7  ml-8 mr-8 justify-between mt-5 '>

            {movieBox.map((element, index) => {
              return <Card key={index} moviedata={element} />
            })}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>



    </div>
  )
}

export default Home