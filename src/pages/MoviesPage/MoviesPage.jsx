import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import toast, { Toaster } from "react-hot-toast";

import MovieList from "../../components/MovieList/MovieList.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import { getSearchMovie } from "../../services/backend-api.js";

import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchMovies, setSearchMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    if (!query) return;
    async function fetchSearchMovies() {
      try {
        setError(false);
        setLoading(true);
        const response = await getSearchMovie(query);
        setSearchMovies(() => response.results);
      } catch (error) {
        console.log("error: ", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchSearchMovies();
  }, [query]);

  const notify = () =>
    toast("Text must be entered to search for images.", {
      duration: 4000,
      position: "top-right",
      style: {
        backgroundColor: "orange",
        color: "white",
      },
    });

  const handleSubmit = (value) => {
    if (!value.query.trim()) return notify();
    if (query === value.query) return;
    setSearchParams({ query: value.query });
  };

  return (
    <>
      <Formik onSubmit={handleSubmit} initialValues={{ query: "" }}>
        <Form className={css.form}>
          <Field
            className={css.inputSearch}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      <Toaster />
      {searchMovies && <MovieList movies={searchMovies} />}
      <Loader loading={loading} />
      {error && <ErrorMessage />}
    </>
  );
};

export default MoviesPage;
