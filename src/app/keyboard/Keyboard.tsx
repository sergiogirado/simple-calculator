import {
  CalculatorAction,
  CalculatorActions,
  CalculatorOperator,
} from "../calculator-reducer";
import "./Keyboard.css";

export type ButtonViewModel = {
  display: string;
  higlight?: boolean;
  getAction(): CalculatorActions;
};

type Props = {
  onAction?: (action: CalculatorActions) => void;
};

function Keyboard({ onAction: onButtonClick }: Props) {
  const numberToButton = (n: number): ButtonViewModel => ({
    display: n.toString(),
    getAction() {
      return { type: CalculatorAction.Digit, digit: n };
    },
  });

  const buttons: ButtonViewModel[] = [
    {
      display: "CE",
      higlight: true,
      getAction: () => ({ type: CalculatorAction.CE }),
    },
    {
      display: "C",
      higlight: true,
      getAction: () => ({ type: CalculatorAction.C }),
    },
    {
      display: "←",
      higlight: true,
      getAction: () => ({ type: CalculatorAction.Backspace }),
    },
    {
      display: "÷",
      higlight: true,
      getAction: () => ({
        type: CalculatorAction.Operator,
        operator: CalculatorOperator.Divide,
      }),
    },
    ...[7, 8, 9].map(numberToButton),
    {
      display: "×",
      higlight: true,
      getAction: () => ({
        type: CalculatorAction.Operator,
        operator: CalculatorOperator.Multiply,
      }),
    },
    ...[4, 5, 6].map(numberToButton),
    {
      display: "-",
      higlight: true,
      getAction: () => ({
        type: CalculatorAction.Operator,
        operator: CalculatorOperator.Subtract,
      }),
    },
    ...[1, 2, 3].map(numberToButton),
    {
      display: "+",
      higlight: true,
      getAction: () => ({
        type: CalculatorAction.Operator,
        operator: CalculatorOperator.Sum,
      }),
    },
    {
      display: "+/-",
      getAction: () => ({ type: CalculatorAction.InvertSign }),
    },
    {
      display: "0",
      getAction: () => ({ type: CalculatorAction.Digit, digit: 0 }),
    },
    { display: ",", getAction: () => ({ type: CalculatorAction.Decimal }) },
    {
      display: "=",
      higlight: true,
      getAction: () => ({ type: CalculatorAction.Result }),
    },
  ];

  return (
    <div className="keyboard">
      {buttons.map((b, i) => (
        <button
          key={i}
          onClick={() => onButtonClick?.(b.getAction())}
          type="button"
          className={`keyboard-button ${
            b.higlight ? "keyboard-button--higlight" : ""
          }`}
        >
          {b.display}
        </button>
      ))}
    </div>
  );
}

export default Keyboard;
