import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form"
import AxiosInstance from '../Config/ApiCall';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../Plugins/Toast';
import { setLoader } from '../Redux/generalSlice';
import Input from '../components/common/Input'


function AddTheatre() {
  const [movies, setMovies] = useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    getMovies();
  }, []);
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
      movie: yup.string().required(),

    })
    .required()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      AxiosInstance({
        url: '/admin/addtheatre',
        method: 'POST',
        data: data,
      }).then((response)=>{
        successToast('Theatre was added successfully')
      })
    } catch (error) {
      console.log(error);
      errorToast('Something went wrong');
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-700 bg-cover bg-center bg-no-repeat " style={{ backgroundImage: "url('https://img.freepik.com/free-photo/movie-background-collage_23-2149876003.jpg?size=626&ext=jpg&ga=GA1.1.1787796043.1706771541&semt=ais_hybrid')" }}>
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Add Your Theatre</h2>
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
              <div>
               <select {...register('movie')}  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option className='font-semibold'>select movie</option>
                {movies.map((element,index)=>{
                  return <option  className='font-semibold' key={index} value={movies._id}>
                    {element.title}
                  </option>
                })}
               </select>
                <p className='text-red-400'>{errors.genre && 'Genre is required'}</p>
              </div>
              <div>
                <Input type={'text'} placeholder={'Number of Seats'}{...register("no.of.seats")} />
                <p className='text-red-400'>{errors.director && 'Director name is required'}</p>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-lg shadow-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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