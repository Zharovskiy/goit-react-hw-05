import { Link, useLocation } from "react-router-dom";

import css from "./MovieList.module.css";

const MovieList = ({ title, movies }) => {
  const location = useLocation();
  return (
    <>
      {title && <h1>{title}</h1>}
      <ul>
        {movies.map(({ id, original_title }) => {
          return (
            <li key={id} className={css.elem}>
              <Link state={location} to={`/movies/${id}`}>
                {original_title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MovieList;
