import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation/Navigation.jsx";
import MovieList from "../../components/MovieList/MovieList.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import { getTrendingMovies } from "../../services/backend-api.js";

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  // const [requestNumber, setRequestNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        setError(false);
        setLoading(true);
        // setRequestNumber((prev) => prev + 1);
        const response = await getTrendingMovies();
        // setPopularMovies((prev) => [...prev, ...response.results]);
        setPopularMovies(() => [...response.results]);
        console.log("response: ", response);
      } catch (error) {
        console.log("error: ", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    // if (requestNumber > 0) {
    //   return;
    // } else {
    fetchPopularMovies();
    // }
  }, []);
  return (
    <>
      <Navigation />
      {popularMovies.length !== 0 && (
        <MovieList popularMovies={popularMovies} />
      )}
      <Loader loading={loading} />
      {error && <ErrorMessage />}
    </>
  );
};

export default HomePage;
