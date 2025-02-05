const Favorites = ({ favorites, removeFromFavorites }) => {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        {favorites.length === 0 ? (
          <p>No favorites yet. Soon come, Soon com</p>
        ) : (
            favorites.map((movie) => (
              <div key={movie.id} className="favorite-card">
                 <h3>{movie.title}</h3>
                <button onClick={() => removeFromFavorites(movie.id)}>
                
                </button>

                <a
                 href={`https://www.youtube.com/results?search_query=${movie.title} trailer`} 
                 target="_blank" 
                 rel="noopener noreferrer">

                
                Watch Trailer
                </a>
              </div>
            ))
        )}
      </div>
    );
  };
  
  export default Favorites;
  