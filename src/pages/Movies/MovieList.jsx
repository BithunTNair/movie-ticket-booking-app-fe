import React, { useEffect, useState } from 'react'
import Card from '../../components/common/Card'
import AxiosInstance from '../../Config/ApiCall'
import NavbarCom from '../../components/common/Navbar';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../Redux/generalSlice';

function MovieList() {
    const [movieBox, setMovieBox] = useState([]);
    const [searchedTerm, setSearchedTerm] = useState('');
    const dispatch=useDispatch()

    useEffect(() => {
        getAllMovies();
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
    };
    const searchedValue = (e) => {
        setSearchedTerm(e.target.value);


    }
    const searchedMovie = movieBox.filter((element) => element.title.toLowerCase().includes(searchedTerm.toLowerCase()));
    return (
        <>
            <NavbarCom />
            <div className='min-w-screen min-h-screen dark:bg-zinc-900 bg-white'>
                <input
                    className="w-full max-w-md px-4 py-2 border mt-3 ml-4 border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search Movie"
                    onChange={searchedValue}
                />

                <div className=' min-w-screen-sm flex flex-wrap gap-7  ml-8 mr-8 justify-between'>

                    {searchedMovie.length > 0 ? searchedMovie.map((element, index) => {
                        return <Card key={index} moviedata={element} />
                    }) : <p className='text-black dark:text-white text-3xl mt-10 ml-4 font-medium'>Sorry No Movie is found</p>}
                </div>
            </div>
        </>
    )
}

export default MovieList