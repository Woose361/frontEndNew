import { useState, useEffect } from 'react';
import {  Routes, Route, Link } from 'react-router-dom';
// import Form from './components/Form';
import MovieList from './components/MovieList.jsx';
import MovieDetails from './components/MovieDetails.jsx';
import Favorites from './components/Favorites.jsx';
import axios from 'axios';
import { fetchMovies } from './services/apiServices.mjs';
import SearchBar from './components/SearchBar.jsx';
import LandingPage from './components/LandingPage.jsx';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);
  
useEffect(() => {
  const getMovies = async () => {
    if (searchQuery) {     
    try { 
      const response = await fetchMovies(searchQuery);
      setMovies(response.results || []);
    } catch (err) {
      console.error("Error fetching movies: ", err);
    }
  } else {
    setMovies([]);
  }
};


  
    getMovies();
}, [searchQuery]);

    // Add movies to favorites
  const addToFavorites = async (movie) => {
    
      
    
    const response = await axios.post('http://localhost:3000/api/movies', movie )
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, movie];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };



    // Remove movies from favorites
  const removeFromFavorites = (movieId) => {
  //   setFavorites((prevFavorites) => {
  //     const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
  //   localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  
  // });

        const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
        setFavorites(updatedFavorites);

};
  return (
    <div className="app">
      <h1>Movie Search App</h1>
      <nav>
        <Link to="/">  Home </Link>
        <Link to="/favorites"> Favorites</Link>
        <Link to="/landing"> About Page</Link>
        </nav> 
       
        <SearchBar setSearchQuery={setSearchQuery}/>


      <Routes>
        <Route path="/" element={<MovieList movies={movies} addToFavorites={addToFavorites} />}  />
        <Route path="/favorites" element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />}/>
        <Route path="/movies/:id" element={<MovieDetails removeFromFavorites={removeFromFavorites} />} />
        <Route path="/landing" element={<LandingPage/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      
    </div>
  );
}

export default App;
