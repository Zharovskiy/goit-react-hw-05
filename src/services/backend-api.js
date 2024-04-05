import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const options = {
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTlmNDdhOTIzNzQwZWRkOGI0NDgxZGY0NjViZGI4NCIsInN1YiI6IjY2MGZiMjQzZTc4ZTJkMDE2MzIyMTk3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uk56-mJOQ9g6PU2R1HIgjHkgu9A_zHefQZCKuYN-BVQ",
  },
  params: {
    api_key: "c99f47a923740edd8b4481df465bdb84",
  },
};

//https://api.themoviedb.org/3/trending/movie/{time_window}
export const getTrendingMovies = async () => {
  const response = await instance.get("/trending/movie/day", options);
  return response.data;
};

//https://api.themoviedb.org/3/search/movie
export const getSearchMovie = async (query) => {
  const response = await instance.get(`/search/movie?query=${query}`, options);
  return response.data;
};

// https://api.themoviedb.org/3/movie/{movie_id}
export const getMovieDetails = async (id) => {
  const response = await instance.get(`/movie/${id}`, options);
  return response.data;
};

// https://api.themoviedb.org/3/movie/{movie_id}/credits
export const getMovieCredits = async (id) => {
  const response = await instance.get(`/movie/${id}/credits`, options);
  return response.data;
};

//https://api.themoviedb.org/3/movie/{movie_id}/reviews
export const getMovieReviews = async (id) => {
  const response = await instance.get(`/movie/${id}/reviews`, options);
  return response.data;
};
