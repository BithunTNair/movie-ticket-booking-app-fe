import React, { useEffect, useState } from 'react'
import NavbarCom from '../common/Navbar'
import AxiosInstance from '../../Config/ApiCall';

function User() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers()
    }, []);

    const getUsers = async () => {
        try {
            const response = await AxiosInstance({
                url: '/admin/getusers',
                method: 'GET'
            });
            setUsers(response.data.users)
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <>
            <NavbarCom />
            <div className="  flex flex-wrap justify-center gap-4 p-6 dark:bg-black">
                {   users.map((user) => {
                    return   <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        <div className="p-4">

                            <h2 className="text-center text-xl font-bold mt-4 text-gray-800 dark:text-white">{user.firstName + ' ' + user.lastName} </h2>
                            <p className="text-center text-gray-600 dark:text-gray-400">Email: {user.email}</p>
                            <p className="text-center text-gray-600 dark:text-gray-400">Mobile: {user.mobileNumber}</p>
                        </div>
                    </div>
                })}




            </div>


        </>
    )
}

export default User