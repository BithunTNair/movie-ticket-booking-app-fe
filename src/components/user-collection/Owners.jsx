import React, { useEffect, useState } from 'react'
import NavbarCom from '../common/Navbar'
import AxiosInstance from '../../Config/ApiCall';
import { useSelector } from 'react-redux';

function Owners() {
    const [owners, setOwners] = useState([]);
    const { user } = useSelector(store => store.user);

    useEffect(() => {
        getOwners()
    }, []);

    const getOwners = async () => {
        try {
            const response = await AxiosInstance({
                url: '/admin/getowners',
                method: 'GET'
            });
            setOwners(response.data.owners)
        } catch (error) {
            console.log(error);

        }
    };

    const deleteOwner = async (id) => {
        try {
            await AxiosInstance({
                method: 'DELETE',
                url: '/admin/deleteowner',
                params: {
                    ownerId: id
                }
            });
            getOwners();
            setOwners(response.data.owners)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>

            <NavbarCom />
            <div className='min-h-screen dark:bg-zinc-950'>
                <div className="  flex flex-wrap justify-center gap-4 p-6 dark:bg-zinc-950">
                    { owners.length>0 ? ( owners.map((user, index) => {
                        return <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800" key={index} >
                            <div className="p-4">

                                <h2 className="text-center text-xl font-bold mt-4 text-gray-800 dark:text-white">{user.firstName + ' ' + user.lastName} </h2>
                                <p className="text-center text-gray-600 dark:text-gray-400">Email: {user.email}</p>
                                <p className="text-center text-gray-600 dark:text-gray-400">Mobile: {user.mobileNumber}</p>
                                <div className=' h-16 flex justify-center items-center'>
                                    <button className='bg-red-500 mt-5  mb-3 hover:bg-red-700 text-white dark:text-black font-bold p-3 rounded' onClick={()=>deleteOwner(user._id)} >Delete</button>
                                </div>
                            </div>
                        </div>
                    })):<p className='text-black dark:text-white text-2xl font-medium'>No Data Is Available</p>}




                </div>
            </div>

        </>
    )
}

export default Owners