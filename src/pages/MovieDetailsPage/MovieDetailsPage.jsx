import { useEffect, useState, useRef } from "react";
import { Link, useParams, useLocation, Outlet } from "react-router-dom";

import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import { getMovieDetails } from "../../services/backend-api.js";

import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [detailsMovie, setDetailsMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    async function fetchDetailsMovie() {
      try {
        setError(false);
        setLoading(true);
        const response = await getMovieDetails(movieId);
        setDetailsMovie(() => response);
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
      {detailsMovie && (
        <>
          <Link to={backLinkRef.current} className={css.back}>
            Go Back
          </Link>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${detailsMovie.backdrop_path}`}
              alt={detailsMovie.title}
            />
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
          <div>
            <h4>Additional infomation</h4>
            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </>
      )}
      <Loader loading={loading} />
      {error && <ErrorMessage />}
    </>
  );
};

export default MovieDetailsPage;
