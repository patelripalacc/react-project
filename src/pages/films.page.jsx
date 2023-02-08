import { useEffect, useState } from "react";
import {
  filterFilmsByDirector,
  getListOf,
  getFilmStats,
} from "../helpers/film.helpers";
import {
  Form,
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { MainLayout, Loader } from "../components";

export default function FilmsPage(props) {
  const [list, setList] = useState([]);
  const [searchDirector, setSearchDirector] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  function getFilms() {
    //fetch API
    fetch(`https://studioghibliapi-d6fc8.web.app/films`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList(data);
        setIsLoaded(true);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getFilms();
  }, []);

  if (!isLoaded) {
    return (
      <MainLayout className="text-center">
        <Loader size={40} />
      </MainLayout>
    );
  }

  const filmsByDirector = filterFilmsByDirector(list, searchDirector);
  const directors = getListOf(list, "director");
  const { avg_score, total, latest } = getFilmStats(filmsByDirector);

  return (
    <MainLayout>
      <div className="">
        <h1>Studio Ghibli Films</h1>
        <Form>
          <Form.Group className="mb-3" controlId="searchDirector">
            <Form.Label>Filter by Director</Form.Label>
            <Form.Select
              value={searchDirector}
              onChange={(e) => setSearchDirector(e.target.value)}
            >
              <option value="">All</option>
              {directors.map((item, idx) => {
                return (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Form>
        <Row className="row">
          <Col>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <small># Of Films</small>
                  <Badge bg="dark">{total}</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <small>Average Rating</small>
                  <Badge bg="dark">{avg_score.toFixed(2)}</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <small>Latest Film</small>
                  <Badge bg="dark">{latest}</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <hr />
        <ListGroup>
          {filmsByDirector.map((item) => {
            return (
              <ListGroupItem key={item.id}>
                <Link to={`${item.id}`}>{item.title}</Link>
                {/* <img src={`${item.image}`} alt="Film Poster" />
                <p>
                  <b>Director:</b> {item.director}, <b>Producer: </b>
                  {item.producer}
                </p>
                <p>
                  <b>Release Date:</b> {item.release_date},{" "}
                  <b>Running Time: </b>
                  {item.running_time} minute, <b>Rotten Tomato Score:</b>{" "}
                  {item.rt_score}
                </p>
                <p>
                  <b>Original Title: </b>
                  {item.original_title}, <b>Original Title Romanized: </b>
                  {item.original_title_romanised}
                </p>
                <p>
                  <b>Banner: </b> <a href={item.movie_banner}>Click</a>
                </p> */}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    </MainLayout>
  );
}
