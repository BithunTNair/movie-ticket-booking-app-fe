import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../Config/ApiCall';

function TheatrebyMovie() {

    const [theatres, setTheatres] = useState([]);
    useEffect(() => {
        getTheatrebyMovie()
    }, []);
    const getTheatrebyMovie = async () => {
        try {
            const response = await AxiosInstance({
                url: '/users/theatrelist',
                method:'GET'
            })
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div>TheatrebyMovie</div>
    )
}

export default TheatrebyMovie