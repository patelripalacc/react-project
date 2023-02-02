import { useState } from "react";
import React from "react";
// import "./App.css";
// import FilmsList from "./components/filmsList";
import "./filmsList.css";

export default function HomePage(props) {
  const [list, setList] = useState([]); //(["ready", "set", "GO"]);
  const [text, setText] = useState("");

  function onSubmit(event) {
    event.preventDefault();

    let newList = [...list, text];
    setList(newList);
    setText("");
  }

  return (
    <div className="home">
      {/* Add a onSubmit prop to the form element that is set to the method onSubmit */}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          id="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {/* Rendering Lists to map each item on list to Assign li as a child of ul and Assign a unique key to each li. */}
        {list.map((item, index) => {
          return <li key={`${item}${index}`}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
