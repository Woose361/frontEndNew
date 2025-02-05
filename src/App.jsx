import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Form from './components/Form';
import MovieList from './components/MovieList.jsx';
import MovieDetails from './components/MovieDetails.jsx';
import Favorites from './components/Favorites.jsx';
import { fetchMovies } from './services/apiServices.mjs';
import SearchBar from './components/SearchBar.jsx';
import { use } from 'react';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  
useEffect(() => {
  const getMovies = async (query = '') => {
    try { 
      const movies = await fetchMovies(query);
      setMovies(movies.results);
    } catch (err) {
      console.error("Error fetching movies: ", err);
    }
  };
});


  getMovies(searchQuery);
}, [searchQuery]);

    // Add movies to favorites
  const addToFavorites = (movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

    // Remove movies from favorites
  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  
  };


  return (
    <div className="app">
      <h1>Movie Search App</h1>
      <SearchBar setMovies={setMovies} setSearchQuery={setSearchQuery}/>
      <nav>
        <Link to="/">  Home </Link>
        <Link to="/favorites"> Favorites</Link>
        </nav> 
       
      <Routes>
        <Route path="/" element={<MovieList movies={movies} addToFavorites={addToFavorites} />}  />
        <Route path="/favorites" element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />}/>
        <Route path="/movies/:id" element={<MovieDetails removeFromFavorites={removeFromFavorites} />} />
      </Routes>
      
    </div>
  );
};

export default App;
