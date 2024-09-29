import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import AxiosInstance from '../Config/ApiCall';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { errorToast, successToast } from '../Plugins/Toast';
import { setLoader } from '../Redux/generalSlice';
import Input from '../components/common/Input'
import NavbarCom from './common/Navbar';


function AddTheatre() {
  const [movies, setMovies] = useState([]);
  const [ownerdata, setOwnerdata] = useState([]);
  const { user } = useSelector(store => store.user)
  const dispatch = useDispatch();
  useEffect(() => {
    getOwners()
    getMovies();
  }, []);
  const getOwners = async () => {
    const owners = await AxiosInstance({
      url: '/admin/getownerdata',
      method: 'GET'
    });
    setOwnerdata(owners.data.owners);
    console.log(ownerdata);


  }
  const getMovies = async () => {
    try {
      const movie = await AxiosInstance({
        url: '/users/movielist',
        method: 'GET'
      });
      setMovies(movie.data.movies);
      console.log(movies);
    } catch (error) {
      console.log(error);

    }

  }
  const schema = yup
    .object({
      name: yup.string().required(),
      location: yup.string().required(),
     

    })
    .required()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data) => {
    try {
      AxiosInstance({
        url: '/admin/addtheatre',
        method: 'POST',
        data: data,
        params: {
          ownerId: user._id
        }
      }).then((response) => {
        successToast('Theatre was added successfully');


      })
    } catch (error) {
      console.log(error);
      errorToast('Something went wrong');
    }
  };

  return (
    <>
      <NavbarCom />
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-900 bg-cover bg-center bg-no-repeat ">
        <div className="w-full max-w-md bg-gray-50 dark:bg-slate-900 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">Add Your Theatre</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-4">
              <div>
                <Input type={'text'} placeholder={'Name of Theatre'} {...register("name")} />
                <p className='text-red-400'>{errors.title && 'Title is required'}</p>
              </div>

              <div>
                <Input type={'text'} placeholder={'Location'}{...register("location")} />
                <p className='text-red-400'>{errors.description && 'Description is required'}</p>
              </div>
              {/* <div>
                <select {...register('movie')} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option className='font-semibold'>select movie</option>
                  {movies.map((element, index) => {
                    return <option className='font-semibold' key={index} value={element._id}>
                      {element.title}
                    </option>
                  })}
                </select>
              </div> */}
            
              <div>
                <Input type={'text'} placeholder={'Number of Seats'}{...register("seats")} />
                <p className='text-red-400'>{errors.director && 'number of seats is required'}</p>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-black dark:bg-yellow-400 dark:hover:bg-green-400 text-white py-2 rounded-lg shadow-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Theatre
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddTheatre