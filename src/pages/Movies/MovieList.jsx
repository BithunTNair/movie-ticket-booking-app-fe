import React, { useEffect, useState } from 'react'
import Card from '../../components/common/Card'
import AxiosInstance from '../../Config/ApiCall'

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
            <div className=' min-w-screen-sm flex flex-wrap gap-7 ml-10 mt-10 mr-10 justify-between'>

                {movieBox.map((element,index) => {
                    return <Card key={index} moviedata={element} />
                })}
            </div>
        </>
    )
}

export default MovieList