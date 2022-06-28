import "./App.css";
import Home from "./Home";
import { Route, BrowserRouter } from "react-router-dom";
import PokeDex from "./PokeDex";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path="/pokedex" component={PokeDex} />
        <Route exact path="/" component={Home} />
      </div>
    </BrowserRouter>
  );
}

export default App;
