import { useState } from 'react';
import { fetchMovies } from '../services/apiServices.mjs';

const Form = ({ setMovies }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  };
    // Changes in the input Field
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchQuery(searchQuery);
    setLoading(true);
  
    try {
      const data = await fetchMovies(searchQuery);
      setMovies(data.results || []);
    } catch (err) {
      console.error("Error fetching movies: ", err);
    } finally {
      setLoading(false);
    }
  
    return (

      <div className='form-container'>
        <form onSubmit={handleSubmit}>
           <input
           type="text"
           placeholder="Search for movie..."
           value={searchQuery}
           onChange={handleChange}
           />
            <button type='submit'>Search</button>
           </form>

           {loading && <p>Loading...</p>}
            </div>
    );
  };
  export default Form;
