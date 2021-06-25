import "./App.scss";
import React, { useState, useEffect } from "react";
const MOVIE_DB_API_URL = "https://api.themoviedb.org/3";

function App() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const apiUrl = `${MOVIE_DB_API_URL}/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1`;
  const imgUrl = "https://image.tmdb.org/t/p/original";

  const handleChange = (event) => {
    setInput(event.target.value);
    console.log(search);
  };

  const handleSearch = async () => {
    try {
      const result = await fetch(
        `${MOVIE_DB_API_URL}/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${input}&append_to_response=images`
      );
      if (result.ok) {
        const searchResults = await result.json();
        setMovies(searchResults.results);
        console.log("something");
        setSearch(`Search results for ${input}`);
        setInput("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchMovies = async () => {
      try {
        const result = await fetch(apiUrl);
        if (result.ok) {
          const initialResults = await result.json();
          setMovies(initialResults.results);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Movies</h1>

        <div is="search-bar">
          <input
            type="search"
            value={input}
            placeholder="Search..."
            onChange={handleChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>

      <div id="container">
        <p id="search-text">{search}</p>

        <div id="search-results">
          {movies.map((movie) => {
            const path =
              movie.poster_path || movie.backdrop_path || movie.still_path;

            return (
              <div key={movie.id} className="movies">
                <img
                  className="posters"
                  src={`${imgUrl}${path}`}
                  alt={movie.title}
                  width="180px"
                  height="auto"
                />

                <div className="titles">
                  <p>{movie.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
