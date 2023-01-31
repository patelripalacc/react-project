// import { Component } from "react";
import { useEffect, useState } from "react";

import React, { Component } from "react";

export default function FilmsList(props) {
  const [list, setList] = useState([]);

  function getFilms() {
    //fetch API
    fetch(`https://studioghibliapi-d6fc8.web.app/films`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList(data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getFilms();
  }, []);

  return (
    <div>
      <ul className="tiles">
        {/* Rendering api list data to map each item on list to Assign li as a child of ul and Assign a unique key to each li. */}
        {list.map((film) => {
          return (
            <li key={film.id}>
              <h2>
                {film.title}
              </h2>
              <img src={`${film.image}`} alt="Film Poster" />
              <p>
                <b>Director:</b> {film.director}, <b>Producer:</b>{film.producer}
              </p>
              <p><b>Release Date:</b> {film.release_date}, <b>Running Time:</b>{film.running_time}minute, <b>Rotten Tomato Score:</b>{film.rt_score}</p>
              <p><b>Original Title: </b>{film.original_title}, <b>Original Title Romanized: </b>{film.original_title_romanised}</p>
              <p>
                <b>Banner: </b> <a href={film.movie_banner}>Click</a>
              </p>
            </li>
          );
        })}
        {list.length == 0 && <p className="loading">Loading.......</p>}
      </ul>
    </div>
  );
}
