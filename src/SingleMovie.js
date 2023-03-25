import React, {useContext, useEffect, useState} from "react";
import { NavLink, useParams } from 'react-router-dom'
import {API_URL} from './context'

const SingleMovie = () => {
  const { id } = useParams();
  const [isLoading,setIsLoading,isError, setIsError] = useState(true);
    const [movie,setMovie] = useState("");

    const getMovies = async(url) => {
        try{ 
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if(data.Response === "True"){
                setIsLoading(false);
                setMovie(data);
            }
            else{
                setIsError({
                    show: true,
                    msg: data.Error,
                })
            }
        }catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        //This setTimeout function allow movies to come after 2 sec and clearTimeout only send one request of movie to API
       let timerOut =  setTimeout(() => {
            getMovies(`${API_URL}&i=${id}`);
        }, 800);
        return () => clearTimeout(timerOut);
    }, [id]);

    if(isLoading){
      return (
        <div className='movie-section'>
          <div className='loading'>
            Loading...
          </div>
        </div>
      )
    }
  return (

    <section className='movie-section'>
      <div className='movie-card'>
        <figure>
          <img src={movie.Poster} alt='' />
        </figure>
        <div className="card-content">
        <p className="title">{movie.Title}</p>
          <p className=""></p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.imdbRating} / 10</p>
          <p className="card-text">{movie.Country}</p>
          <NavLink to='/' className='back-btn'>
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
    
  )
}

export default SingleMovie