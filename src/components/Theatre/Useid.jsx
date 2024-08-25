import React from 'react'
import { useParams } from 'react-router-dom'
import TheatreSeats from './TheatreSeats'

function Useid() {
    const { id } = useParams()
    return (
        <div>
            <TheatreSeats theatreId={id} />
        </div>
    )
}

export default Useid