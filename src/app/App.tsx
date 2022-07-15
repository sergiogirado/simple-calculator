import { useReducer } from "react";
import { CalculatorReducer, initialState } from "./calculator-reducer";
import "./App.css";
import Display from "./Display/Display";
import Keyboard from "./keyboard/Keyboard";

function App() {
  const [state, dispatch] = useReducer(CalculatorReducer, initialState);

  return (
    <div className="app">
      <div className="app-container">
        <img src="logo.svg" alt="Equal Experts" />
        <header className="app-header">Simple Calculator</header>
        <div className="app-display">
          <Display state={state} />
        </div>
        <div className="app-keyboard">
          <Keyboard onAction={dispatch} />
        </div>
      </div>
    </div>
  );
}

export default App;
