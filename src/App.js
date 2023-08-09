import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    if (retrying) {
      const retryInterval = setInterval(() => {
        fetchMoviesHandler();
      }, 5000);

      return () => {
        clearInterval(retryInterval);
      };
    }
  }, [retrying]);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError('Something went wrong... Retrying');
    
    try {
      const response = await fetch('https://swapi.dev/api/film');

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));

      setMovies(transformedMovies);
      setIsLoading(false);
      setError(null);
      setRetrying(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  function handleRetryClick() {
    setRetrying(true);
  }

  function handleCancelRetryClick() {
    setRetrying(false);
    setError(null);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && error && (
          <p>
            {error}
            <button onClick={handleRetryClick}>Retry</button>
            <button onClick={handleCancelRetryClick}>Cancel</button>
          </p>
        )}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
