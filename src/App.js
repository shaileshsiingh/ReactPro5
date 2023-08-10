import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const[movies, setMovies] = useState([])
  const[isloading, setIsLoading] = useState(false)

  
  const fetchMoviesHandler = useCallback(async()=>{
  setIsLoading(true)
    const response = await fetch('https://swapi.dev/api/films')
    const data = await response.json()

    const transformedMovies = data.results.map((movieData)=>{
      return {
        id:movieData.episode_id,
        title:movieData.title,
        openingText:movieData.opening_crawl,
        releaseDate:movieData.release_date,
      }
    })
    setMovies(transformedMovies)
    setIsLoading(false)
    console.log(transformedMovies)
  },[])
  
  useEffect(()=>{
    fetchMoviesHandler()
  },[fetchMoviesHandler])

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isloading && <MoviesList movies={movies} />}
        {isloading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;