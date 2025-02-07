import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import serviceCall, { ACTIONS } from '../services/apiServices';;
import { fetchMovieDetails } from '../services/apiServices';

const MovieDetails = ({ addToFavorites, removeFromFavorites }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      try {
        const movieData = await fetchMovieDetails(id);
        setMovie(movieData);

        // fetch movie trailer
        const videoData = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=ab881e0e86fe5334e70ca49928474d21`);
        const videoJson = await videoData.json();

        if (videoJson.results.length > 0) {
          setTrailerKey(videoJson.results[0].key);
        }

        } catch (err) {
          console.error("Error fetching movie details: ", err);
        } finally {
          setLoading(false);
        }   
        };

        getMovieDetails();
        }, [id]);
        
        if (loading) 
          return <p> Loading movie data...</p>;
      if (!movie) 
          return <p> Movie not found</p>;

    //     const fetchVideos = async (id) => {
    //       const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=ab881e0e86fe5334e70ca49928474d21`);
    //       const data = await response.json();
    //       return data;


        const handleAddToFavorites = async () => {
          try {
            const newFavorite = await serviceCall(ACTIONS.create, {
              title: movie.title,
              name: movie.name,
              description: movie.overview,
            });

            addToFavorites(newFavorite); 
          } catch (err) {
            console.error("Error adding to favorites", err);
          }
        };

        const handleRemoveFromFavorites = async () => {
          try {
          await serviceCall(ACTIONS.delete, null, movie.id);
      removeFromFavorites(movie.id); 
      } catch (err) {
        console.error("Error removing from favorites", err);
      }
    };

    //     if (loading) 
    //         return <p> Loading movie data...</p>;
    //     if (!movie) 
    //         return <p> Movie not found</p>;
        
        return (    
            <div className="movie-details">
                <h2>{movie.title}</h2>
                <p>Release Date: {movie.release_date}</p>
                <p>{movie.overview}</p>
                <button onClick= {handleAddToFavorites}> Add to Favorites</button>
                <button onClick= {handleRemoveFromFavorites}> Remove from Favorites</button>

            <div>
                <h3>Watch Trailer:</h3>
          <iframe
            title="Movie Trailer"
            width="100%"
            height="500"
              src={`https://www.youtube.com/embed/${trailerKey}`}            
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            ></iframe>
        </div>
            </div>
        );
    };

    export default MovieDetails;
