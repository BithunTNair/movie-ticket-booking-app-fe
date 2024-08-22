import React, { useEffect } from 'react'
import AxiosInstance from '../../Config/ApiCall'

function Card() {
    useEffect(async() => {
    try {
        const movies= await   AxiosInstance({
            url: '/user/movielist',
            method: 'GET'
        })
    } catch (error) {
        console.log(error);
        
    }
    }, [])
    return (
        <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white transform hover:scale-105 transition-transform duration-300">
            {/* Image or Icon Section */}
            <div className="relative">
                <img
                    className="w-full h-64 object-cover"
                    src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS4xLzEwICAxMC40SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00405504-neejccexkl-portrait.jpg"
                    alt="Card Image"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-white text-lg font-bold"></h3>
                    <p className="text-gray-300 text-sm">Card Subtitle</p>
                </div>
            </div>

            {/* Info Section */}
            <div className="p-4">
                <p className="text-gray-600 text-base">
                    A brief description goes here. This can be an introduction or summary of the content within the card.
                </p>
            </div>

            {/* Action Button */}
            <div className="p-4 border-t border-gray-200">
                <button className="w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300">
                    Book Now
                </button>
            </div>
        </div>

    )
}

export default Card