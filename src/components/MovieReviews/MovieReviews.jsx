import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import { getMovieReviews } from "../../services/backend-api.js";

const MovieReviews = () => {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchDetailsMovieReviews() {
      try {
        setError(false);
        setLoading(true);
        const response = await getMovieReviews(movieId);
        setReviews(() => response.results);
      } catch (error) {
        console.log("error: ", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchDetailsMovieReviews();
  }, [movieId]);
  return (
    <>
      {reviews && (
        <ul>
          {reviews.map(({ id, author, content }) => {
            return (
              <li key={id}>
                <h4>{`Author: ${author}`}</h4>
                <p>{content}</p>
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

export default MovieReviews;
