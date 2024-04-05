import { Link } from "react-router-dom";

const MovieList = ({ popularMovies }) => {
  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {popularMovies.map(({ id, original_title }) => {
          return (
            <li key={id}>
              <Link to={`/movies/${id}`}>{original_title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MovieList;
