import axios from 'axios';

const API_KEY = "ab881e0e86fe5334e70ca49928474d21";
const BASE_URL = "https://api.themoviedb.org/3";


 export const fetchMovies = async  (query = '') => {

  try {
    const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1`);
  return response.data;
  } catch (err) {
    console.error("Error fetching movies ", err);
    return { results: [] };
  } 
};

export const fetchMoviesDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, { 
      params: {
      api_key: API_KEY, 
    },
    });
    
    return response.data;
  } catch (err) {
    console.error("Error fetching movies: ", err);
  return null;
  }
};

  
export const ACTIONS = {
  create: 'create',
  read: 'read',
  update: 'update',
  delete: 'delete',
};
 
export default async function serviceCall(action, formData, id) {
  // const url = 'https://movie-backend-6tsw.onrender.com/api/movies';
  const url = 'https://localhost:6000/api/movies';

  switch (action) {
    case ACTIONS.create:
      return createFavorite(url, formData);
    case ACTIONS.read:
      return getFavorites(url);
    case ACTIONS.update:
      return updateFavorite(url, id, formData);
    case ACTIONS.delete:
      return deleteFavorite(url, id);
  }
}
 
async function getFavorites(url) {
  try {
    let res = await axios.get(url);
 
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
 
async function createFavorite(url, formData) {
  try {
    const res = await axios.post(url, formData);
    
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
 
async function updateFavorite(url, id, formData) {
  try {
    let res = await axios.put(`${url}/${id}`, formData);
 
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
 
async function deleteFavorite(url, id) {
  try {
    let res = await axios.delete(`${url}/${id}`);
 
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
