import { useState } from "react";
import {
  CalculatorActions,
  CalculatorReducer,
  initialState,
} from "./calculator-reducer";
import "./App.css";
import Display from "./Display/Display";
import Keyboard from "./keyboard/Keyboard";

function App() {
  const [calculatorState, setCalculatorState] = useState(initialState);

  function onButtonClick(action: CalculatorActions) {
    setCalculatorState(CalculatorReducer(calculatorState, action));
  }

  return (
    <div className="app">
      <div className="app-container">
        <img src="logo.svg" alt="Equal Experts" />
        <header className="app-header">Simple Calculator</header>
        <div className="app-display">
          <Display state={calculatorState} />
        </div>
        <div className="app-keyboard">
          <Keyboard onAction={onButtonClick} />
        </div>
      </div>
    </div>
  );
}

export default App;
