// import { Component } from "react";

import React, { Component } from "react";

export default class FilmsList extends Component {
  //Create a constructor for the FilmsList class
  constructor(props) {
    super(props);
   //Define a list property on this.state that is assigned an empty array
    this.state = {
      list: [],
    };
  }
  //Create a method called getFilms on the FilmsList class
  getFilms() {
    //fetch API
    fetch(`https://studioghibliapi-d6fc8.web.app/films`)
    //the first then call should receive a callback function that returns the result parsed to json
      .then((res) => {
        return res.json();
      })
      //the second then call should receive a callback function that uses this.setState() to set this.state.list equal to the result
      .then((data) => {
        this.setState({
          list: data,
        });
      })
      // add a catch method call that should receive a callback function that will handle an error if one occurs
      .catch((err) => console.error(err));
  }
  //Create a componentDidMount method on the FilmsList class
  componentDidMount() {
    //Call getFilms within the method body
    this.getFilms();
  }

  render() {
    return (
      <div>
        <ul>
          {/* Rendering api list data to map each item on list to Assign li as a child of ul and Assign a unique key to each li. */}
          {this.state.list.map((film) => {
            return <li key={film.id}>{film.title}</li>;
          })}
        </ul>
       
      </div>
    );
  }
}
