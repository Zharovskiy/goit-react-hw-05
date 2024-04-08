import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import { getTrendingMovies } from "../../services/backend-api.js";

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        setError(false);
        setLoading(true);
        const response = await getTrendingMovies();
        setPopularMovies(() => [...response.results]);
      } catch (error) {
        console.log("error: ", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPopularMovies();
  }, []);
  return (
    <>
      {popularMovies.length !== 0 && (
        <MovieList title={"Trending today"} movies={popularMovies} />
      )}
      <Loader loading={loading} />
      {error && <ErrorMessage />}
    </>
  );
};

export default HomePage;
