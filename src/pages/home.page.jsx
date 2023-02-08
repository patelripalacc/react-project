import { useState } from "react";
import React from "react";
// import "./App.css";
// import FilmsList from "./components/filmsList";
import "./filmsList.css";
import { MainLayout} from "../components";

export default function HomePage(props) {
  const [list, setList] = useState([]); //(["ready", "set", "GO"]);
  const [text, setText] = useState("");

  function onSubmit(event) {
    event.preventDefault();

    let newList = [...list, text];
    setList(newList);
    setText("");
  }

  function onDblClick(idx) {
    let newList = list.filter((_, i) => i !== idx);
    setList(newList);
  }

  return (
    <MainLayout>
      <h1>Learning React</h1>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="listitem"
          id="listitem"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {list.map((item, idx) => {
          return (
            <li key={idx} onDoubleClick={() => onDblClick(idx)}>
              {item}
            </li>
          );
        })}
      </ul>
    </MainLayout>
  );
}
