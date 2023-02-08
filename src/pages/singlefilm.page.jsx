import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout, Loader } from "../components";

export default function SingleFilmPage(props) {
  const [item, setItem] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();

  function getFilm() {
    //fetch API
    fetch(`https://studioghibliapi-d6fc8.web.app/films/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setItem(data);
        setIsLoaded(true);
      })
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    getFilm();
  }, [id]);

  if (!isLoaded) {
    return (
      <MainLayout className="text-center">
        <Loader size={40} />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="row">
        <div className="col-md-6 mb-4">
          <img
            className="img-fluid"
            src={`${item.image}`}
            alt={`${item.title} Poster`}
          />
        </div>
        <div className="col-md-6 mb-4">
          <h1>{item.title}</h1>
          <p>
            Directed by {item.director}. Produced by {item.producer}.
          </p>
          <p>
            The film was released in <strong>{item.release_date}</strong> and
            garnered a <strong>{item.rt_score}</strong> aggregate score on{" "}
            <a
              href="https://www.rottentomatoes.com/"
              target="_blank"
              rel="noreferrer"
            >
              Rotten Tomatoes
            </a>
            .
          </p>
          <p>
            <b>Banner: </b> <a href={item.movie_banner}>Click</a>
          </p>
          <h2>Description</h2>
          <p>{item.description}</p>
        </div>
        <pre></pre>
      </div>
    </MainLayout>
  );
}
