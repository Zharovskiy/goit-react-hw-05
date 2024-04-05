import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import { getMovieDetails } from "../../services/backend-api.js";

const MovieDetailsPage = () => {
  const [detailsMovie, setDetailsMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchDetailsMovie() {
      try {
        setError(false);
        setLoading(true);
        const response = await getMovieDetails(movieId);
        setDetailsMovie(() => response);
        console.log("response: ", response);
      } catch (error) {
        console.log("error: ", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchDetailsMovie();
  }, [movieId]);

  return (
    <>
      <Navigation />
      {detailsMovie && (
        <div>
          <img src={detailsMovie.backdrop_path} alt={"alt"} />
          <div>
            <h2>{`${
              detailsMovie.original_title
            } (${detailsMovie.release_date.slice(0, 4)})`}</h2>
            <p>{`User Score: ${detailsMovie.popularity}%`}</p>
            <h3>Overview</h3>
            <p>{detailsMovie.overview}</p>
            <h4>Genres</h4>
            <ul>
              {detailsMovie.genres.map(({ id, name }) => {
                return <li key={id}>{name}</li>;
              })}
            </ul>
          </div>
        </div>
      )}
      <Loader loading={loading} />
      {error && <ErrorMessage />}
    </>
  );
};

export default MovieDetailsPage;
