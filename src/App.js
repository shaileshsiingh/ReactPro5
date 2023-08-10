import React, { useCallback, useEffect, useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false); // To control showing the add movie form
  const [newMovie, setNewMovie] = useState({
    title: '',
    openingText: '',
    releaseDate: '',
  });

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch('https://swapi.dev/api/films');
    const data = await response.json();

    const transformedMovies = data.results.map((movieData) => ({
      id: movieData.episode_id,
      title: movieData.title,
      openingText: movieData.opening_crawl,
      releaseDate: movieData.release_date,
    }));

    setMovies(transformedMovies);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = () => {
    setShowAddForm(true);
  };

  const submitMovieHandler = () => {
    const newMovieObj = {
      id: movies.length + 1, // Replace this with a more appropriate way to generate IDs
      ...newMovie,
    };

    setMovies((prevMovies) => [...prevMovies, newMovieObj]);
    setShowAddForm(false);
    console.log(newMovieObj);
  };

  return (
    <React.Fragment>
      <section> 
         <button onClick={addMovieHandler}>Add Movie</button>
</section>
<section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
<section>
        {showAddForm && (
          <div>
            <input
              type="text"
              placeholder="Title"
              value={newMovie.title}
              onChange={(event) =>
                setNewMovie((prevMovie) => ({
                  ...prevMovie,
                  title: event.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Opening Text"
              value={newMovie.openingText}
              onChange={(event) =>
                setNewMovie((prevMovie) => ({
                  ...prevMovie,
                  openingText: event.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Release Date"
              value={newMovie.releaseDate}
              onChange={(event) =>
                setNewMovie((prevMovie) => ({
                  ...prevMovie,
                  releaseDate: event.target.value,
                }))
              }
            />
            <button onClick={submitMovieHandler}>Submit</button>
          </div>
        )}
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading && <p>Loading...</p>}
      </section>
      
    </React.Fragment>
  );
}

export default App;
