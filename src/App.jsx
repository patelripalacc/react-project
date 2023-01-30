import { Component } from "react";
import React from "react";
import "./App.css";

//Creating constructor for the App class
class App extends Component {
  constructor(props) {
    super(props);
    //In the body of the constructor, assign an object to a property called state
    this.state = {
      //On the state object, add two properties: list , text
      //Assign list as the array:
      list: ["ready", "set", "GO"],
      //Assign text as an empty string
      text: "",
    };
    //In the constructor, bind this to the this.onSubmit method
    this.onSubmit = this.onSubmit.bind(this);
  }
  //Create a method named onSubmit on the App class
  //Receive the HTMLSubmitEvent as a parameter
  onSubmit(event) {
    //Call the preventDefault() method on the parameter event
    event.preventDefault();
    //Call this.setState() to update the this.state.list value to a new array contains all of the previous list items and the current this.state.text
    let newList = [...this.state.list, this.state.text];
    this.setState({ list: newList, text: "" });
  }
  //Rendering Lists
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        {/* Add a onSubmit prop to the form element that is set to the method this.onSubmit */}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="text"
            id="text"
            value={this.state.text}
            // Add an onChange prop to the input that is set to a function this.steState() that will: call to update the value that is in input.
            onChange={(event) => this.setState({ text: event.target.value })}
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {/* Rendering Lists to map each item on list to Assign li as a child of ul and Assign a unique key to each li. */}
          {this.state.list.map((item, index) => {
            return <li key={`${item}${index}`}>{item}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default App;
