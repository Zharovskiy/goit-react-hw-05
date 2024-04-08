import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import { getMovieCredits } from "../../services/backend-api.js";

import css from "./MovieCast.module.css";

const MovieCast = () => {
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchDetailsMovieCast() {
      try {
        setError(false);
        setLoading(true);
        const response = await getMovieCredits(movieId);
        setCast(() => response.cast);
      } catch (error) {
        console.log("error: ", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchDetailsMovieCast();
  }, [movieId]);
  return (
    <>
      {cast && (
        <ul className={css.list}>
          {cast.map(({ id, character, name, profile_path }) => {
            return (
              <li className={css.card} key={id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                  alt={name}
                />
                <h4>{name}</h4>
                <p>{character}</p>
              </li>
            );
          })}
        </ul>
      )}
      <Loader loading={loading} />
      {error && <ErrorMessage />}
    </>
  );
};

export default MovieCast;
