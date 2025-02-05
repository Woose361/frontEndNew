const Favorites = ({ favorites, removeFromFavorites }) => {
    if (favorites.length === 0) {
      return <p>No favorites yet. Soon come, Soon come</p>;
    }
  return (
      <div className="favorites">
        <h2>Your Favorites</h2>
       
        
            {favorites.map((movie) => (
              <div key={movie.id} className="movie-card">
                {movie.poster_path ? (
                   <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                  />
                
              ) : (
                <img
              src="https://via.placeholder.com/500x750?text=No+Poster+Available"
              alt="No poster available"
              className="movie-poster"
            />
          )}
                 <h3>{movie.title}</h3>
                <button onClick={() => removeFromFavorites(movie.id)}> Remove From Favorites </button>

                

                <a
                 href={`https://www.youtube.com/results?search_query=${movie.title} trailer`} 
                 target="_blank" 
                 rel="noopener noreferrer">

                
                Watch Trailer
                </a>
              </div>
        ))}
      </div>
    );
  };

  
  export default Favorites;
  