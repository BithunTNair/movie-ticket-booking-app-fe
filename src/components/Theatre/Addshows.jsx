import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form"
import AxiosInstance from '../../Config/ApiCall';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate, useParams } from 'react-router-dom';
import { errorToast, successToast } from '../../Plugins/Toast';
import { setLoader } from '../../Redux/generalSlice';
import Input from '../../components/common/Input';
import { TIMINGS } from '../constants/Timings';
import NavbarCom from '../common/Navbar';

function Addshows() {
  const { id } = useParams()
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovies()
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
  // const schema = yup.object({
  //   showtimeDate: yup
  //     .date()
  //     .required(),
  //     // .min(new Date(), 'Date cannot be in the past'),
  //   movieId: yup.string().required(),
  //   time: yup.string().required(),
  //   seats: yup.number().required().positive().integer(),
  // }).required();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);

    try {
      AxiosInstance({
        url: `/admin/addshows/${id}`,
        method: 'POST',
        data: data,
      }).then((response) => {
        successToast('show is added successfully');


      })
    } catch (error) {
      console.log(error);
      errorToast('Something went wrong');
    }
  };

  return (
    <>
    <NavbarCom/>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black bg-cover bg-center bg-no-repeat ">
        <div className="w-full max-w-md bg-white dark:bg-blue-700 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 dark:text-white ">Add Shows</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-4">
              <div>
                <Input type={'date'} {...register("showtimeDate")} />
                <p className='text-red-400'>{errors.showtimeDate && 'Date is required'}</p>
              </div>
              <div>
                <select {...register('movieId')} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option className='font-semibold'>select movie</option>
                  {movies.map((element, index) => {
                    return <option className='font-semibold' key={index} value={element._id}>
                      {element.title}
                    </option>
                  })}
                </select>
              </div>
              <div>
                <select {...register('time')} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option className='font-semibold'>Select Time</option>
                  {TIMINGS.map((element, index) => {
                    return <option className='font-semibold' key={index} >
                      {element.name}
                    </option>
                  })}
                </select>
              </div>
              <div>
                <Input type={'text'} placeholder={'Number of Seats'}{...register("seats")} />
                <p className='text-red-400'>{errors.seats && 'seat number is required'}</p>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Create Show
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Addshows