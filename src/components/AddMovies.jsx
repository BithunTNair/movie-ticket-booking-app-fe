import React from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form"
import AxiosInstance from '../Config/ApiCall';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../Plugins/Toast';
import { setLoader } from '../Redux/generalSlice';
import Input from '../components/common/Input'

function AddMovies() {
  const dispatch = useDispatch()
  const schema = yup
    .object({
      title: yup.string().required(),
      description: yup.string().required(),
      director: yup.string().required(),
      genre: yup.string().required(),
      rating: yup.string().required(),
      poster: yup.mixed().required()

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
    dispatch(setLoader(true))
    try {
      const formData= new FormData();
      formData.append('title',data.title);
      formData.append('description', data.description);
      formData.append('director', data.director);
      formData.append('genre', data.genre);
      formData.append('rating', data.rating);
      formData.append('poster', data.poster[0]);
      AxiosInstance({
        url:'/admin/addmovie',
        method: 'POST',
        data:formData,
        headers:{
           'Content-Type': 'multipart/form-data'
        }
      });
      dispatch(setLoader(false));
      successToast('movie was added successfully')
    } catch (error) {
      console.log(error);
      errorToast('Something went wrong');
      dispatch(setLoader(false))
    }
  };


  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-stone-900 bg-cover bg-center bg-no-repeat " style={{ backgroundImage: "" }}>
        <div className="w-full max-w-md bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">Add Movie</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-4">
              <div>
                <Input type={'text'} placeholder={'Movie Title'} {...register("title")} />
                <p className='text-red-400'>{errors.title && 'Title is required'}</p>
              </div>

              <div>
                <Input type={'text'} placeholder={'Description'}{...register("description")} />
                <p className='text-red-400'>{errors.description && 'Description is required'}</p>
              </div>
              <div>
                <Input type={'text'} placeholder={'Genre'}{...register("genre")} />
                <p className='text-red-400'>{errors.genre && 'Genre is required'}</p>
              </div>
              <div>
                <Input type={'text'} placeholder={'Director'}{...register("director")} />
                <p className='text-red-400'>{errors.director && 'Director name is required'}</p>
              </div>

              <div>
                <Input type={'number'} placeholder={'Rating'}{...register("rating")} />
                <p className='text-red-400'>{errors.rating && 'Rating is required'}</p>
              </div>
              <div>
                <Input type={'file'} placeholder={'Poster'}{...register("poster")} />
                <p className='text-red-400'>{errors.poster && 'Poster is required'}</p>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full   text-white py-2 rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 ..."
                >
                  Add Movie
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddMovies