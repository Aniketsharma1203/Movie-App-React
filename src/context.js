import React, {useContext, useEffect, useState} from "react";

export const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [isLoading,setIsLoading] = useState(true);
    const [movie,setMovie] = useState([]);
    const[isError,setIsError] = useState({ show: "false", msg: ""})
    const [query, setQuery] = useState("Titanic");

    const getMovies = async(url) => {
        setIsLoading(true);
        try{ 
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if(data.Response === "True"){
                setIsLoading(false);
                setMovie(data.Search);
            }
            else{
                setIsError({
                    show: true,
                   
                })
            }
        }catch (error){
            console.log('error');
        }
    }

    useEffect(() => {
        //This setTimeout function allow movies to come after 2 sec and clearTimeout only send one request of movie to API
       let timerOut =  setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`);
        }, 800);
        return () => clearTimeout(timerOut);
    }, [query]);

    return <AppContext.Provider value={{isLoading, isError, movie, query, setQuery}}>
        {children}
    </AppContext.Provider>
};

const useGlobalContext = () => {
    return useContext(AppContext);
} 
export {AppContext, AppProvider, useGlobalContext};