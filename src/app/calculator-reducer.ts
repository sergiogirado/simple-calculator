export enum CalculatorOperator {
  Sum = "+",
  Subtract = "-",
  Multiply = "×",
  Divide = "÷",
}

export interface CalculatorState {
  inputOperand: string;
  cachedOperand?: number;
  operator?: CalculatorOperator;
  result?: number;
}

export enum CalculatorAction {
  CE,
  C,
  InvertSign,
  Result,
  Decimal,
  Backspace,
  Operator,
  Digit,
}

export type CalculatorActions =
  | { type: CalculatorAction.CE }
  | { type: CalculatorAction.C }
  | { type: CalculatorAction.InvertSign }
  | { type: CalculatorAction.Result }
  | { type: CalculatorAction.Decimal }
  | { type: CalculatorAction.Backspace }
  | { type: CalculatorAction.Operator; operator: CalculatorOperator }
  | { type: CalculatorAction.Digit; digit: number };

const operatorFunctions: Record<
  CalculatorOperator,
  (a: number, b: number) => number
> = {
  [CalculatorOperator.Sum]: (a, b) => a + b,
  [CalculatorOperator.Subtract]: (a, b) => a - b,
  [CalculatorOperator.Multiply]: (a, b) => a * b,
  [CalculatorOperator.Divide]: (a, b) => a / b,
};

export const initialState: CalculatorState = {
  inputOperand: "0",
};

export function CalculatorReducer(
  state: CalculatorState = initialState,
  action: CalculatorActions
): CalculatorState {
  switch (action.type) {
    case CalculatorAction.CE: {
      return { ...(state.result ? {} : state), inputOperand: "0" };
    }

    case CalculatorAction.C: {
      return { inputOperand: "0" };
    }

    case CalculatorAction.InvertSign: {
      if (state.result) return { inputOperand: (state.result * -1).toString() };

      return { ...state, inputOperand: (+state.inputOperand * -1).toString() };
    }

    case CalculatorAction.Result: {
      const { inputOperand, cachedOperand, operator } = state;
      if (!operator) return { ...state };

      const operatorFunction = operatorFunctions[operator];
      const result = operatorFunction(cachedOperand ?? 0, +inputOperand);

      return { ...state, result };
    }

    case CalculatorAction.Decimal: {
      if (state.result) return { inputOperand: "0." };

      const operand = state.inputOperand;
      const inputOperand = operand + (operand.includes(".") ? "" : ".");

      return { ...state, inputOperand };
    }

    case CalculatorAction.Backspace: {
      if (state.result) return { inputOperand: state.result.toString() };

      const operand = state.inputOperand.toString();
      const inputOperand = operand.length !== 1 ? operand.slice(0, -1) : "0";

      return { ...state, inputOperand };
    }

    case CalculatorAction.Operator: {
      const fixedState = +state.inputOperand
        ? CalculatorReducer(state, { type: CalculatorAction.Result })
        : state;

      return {
        cachedOperand: fixedState.result ?? +fixedState.inputOperand,
        operator: action.operator,
        inputOperand: "0",
      };
    }

    case CalculatorAction.Digit: {
      const digit = action.digit.toString();
      if (state.result) return { inputOperand: digit };

      const str = +`${state.inputOperand}${digit}`;
      return { ...state, inputOperand: str.toString() };
    }

    default:
      return { ...state };
  }
}
