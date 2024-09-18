import React, { useEffect, useState } from 'react'
import Card from '../../components/common/Card'
import AxiosInstance from '../../Config/ApiCall'
import NavbarCom from '../../components/common/Navbar';

function MovieList() {
    const [movieBox, setMovieBox] = useState([]);
    useEffect(() => {
        getAllMovies()
    }, [])
    const getAllMovies = async () => {
        try {
            const movie = await AxiosInstance({
                url: '/users/movielist',
                method: 'GET'
            })
            setMovieBox(movie.data.movies);
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <>
        <NavbarCom/>
            <div className='min-w-screen min-h-screen dark:bg-zinc-900 bg-white'>

                <div className=' min-w-screen-sm flex flex-wrap gap-7  ml-8 mr-8 justify-between '>

                    {movieBox.map((element, index) => {
                        return <Card key={index} moviedata={element} />
                    })}
                </div>
            </div>
        </>
    )
}

export default MovieList