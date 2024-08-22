import React, { useEffect, useState } from 'react'
import Card from '../../components/common/Card'
import AxiosInstance from '../../Config/ApiCall'

function MovieList() {
    const [movieBox, setMovieBox] = useState([]);
    useEffect(() => {
        getAllMovies()
    }, [])
    const getAllMovies = () => {
        try {
            AxiosInstance({
                url: '/users/movielist',
                method: 'GET'
            }).then((response) => {
                setMovieBox(response.data);
                console.log(movieBox);

            }).catch((error) => {
                console.log(error);

            })
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <>
            <div className=' min-w-screen-sm flex flex-wrap gap-7 ml-10 mt-10 mr-10 justify-between'>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />

              



            </div>

        </>
    )
}

export default MovieList