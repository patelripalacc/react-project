import { useEffect, useState } from "react";
import {
  filterFilmsByDirector,
  getListOf,
  getFilmStats,
} from "../helpers/film.helpers";
import { Link } from "react-router-dom";

export default function FilmsPage(props) {
  const [list, setList] = useState([]);
  const [searchDirector, setSearchDirector] = useState("");

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

  const filmsByDirector = filterFilmsByDirector(list, searchDirector);
  const directors = getListOf(list, "director");
  let {avg_score, total, latest} = getFilmStats(filmsByDirector);

  return (
    <div>
      <h1 className="text-center">Studio Ghibli Films</h1>
      <form className="Form1">
        <div className="form-group">
          <label htmlFor="searchDirector">Search by Director</label>
          <select
            name="searchDirector"
            id="searchDirector"
            value={searchDirector}
            onChange={(element) => setSearchDirector(element.target.value)}
          >
            <option value="">All</option>
            {directors.map((director, index) => {
              return (
                <option key={director + index} value={director}>
                  {director}
                </option>
              );
            })}
          </select>
        </div>
      </form>
      <div className="inFo">
        <div>
          <span># Of Films: </span>
          <span>{total}</span>
        </div>
        <div>
          <span>Average Rating: </span>
          <span>{avg_score.toFixed(2)}</span>
        </div>
        <div>
          <span>Latest Film: </span>
          <span>{latest}</span>
        </div>
      </div>
      <ul className="tiles">
        {/* Rendering api list data to map each item on list to Assign li as a child of ul and Assign a unique key to each li. */}
        {filmsByDirector.map((film) => {
          return (
            <li key={film.id}>
              <Link className="h2" to={`/films/${film.id}`}>
                {film.title}
              </Link>
              <img src={`${film.image}`} alt="Film Poster" />
              <p>
                <b>Director:</b> {film.director}, <b>Producer: </b>
                {film.producer}
              </p>
              <p>
                <b>Release Date:</b> {film.release_date}, <b>Running Time: </b>
                {film.running_time} minute, <b>Rotten Tomato Score:</b>{" "}
                {film.rt_score}
              </p>
              <p>
                <b>Original Title: </b>
                {film.original_title}, <b>Original Title Romanized: </b>
                {film.original_title_romanised}
              </p>
              <p>
                <b>Banner: </b> <a href={film.movie_banner}>Click</a>
              </p>
            </li>
          );
        })}
        {list.length === 0 && <p className="loading">Loading.......</p>}
      </ul>
    </div>
  );
}
