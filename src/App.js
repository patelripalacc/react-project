import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Learning React.js</h1>
        <p>
         React is so Cool!
        </p>
        <p>Second Paragraph</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ul>
          <li>1st Li</li>
          <li>2nd Li</li>
          <li>3rd Li</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
