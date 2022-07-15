import {
  CalculatorAction,
  CalculatorOperator,
  CalculatorReducer,
  CalculatorState,
} from "./calculator-reducer";

describe("CalculatorReducer", () => {
  let state: CalculatorState | undefined;

  beforeEach(() => {
    state = undefined;
  });

  describe("CalculatorAction.CE", () => {
    describe("when state does not include result", () => {
      test("preserves cached operand and operator", () => {
        state = {
          cachedOperand: 2,
          operator: CalculatorOperator.Divide,
          inputOperand: "5",
        };
        state = CalculatorReducer(state, { type: CalculatorAction.CE });

        expect(state).toStrictEqual({
          cachedOperand: 2,
          operator: CalculatorOperator.Divide,
          inputOperand: "0",
        });
      });
    });
    describe("when state includes result", () => {
      test("resets all the state", () => {
        state = {
          cachedOperand: 6,
          operator: CalculatorOperator.Divide,
          inputOperand: "2",
          result: 3,
        };
        state = CalculatorReducer(state, { type: CalculatorAction.CE });

        expect(state).toStrictEqual({ inputOperand: "0" });
      });
    });
  });

  describe("CalculatorAction.C", () => {
    test("clears full state", () => {
      state = {
        cachedOperand: 4,
        operator: CalculatorOperator.Multiply,
        inputOperand: "2",
      };
      state = CalculatorReducer(state, { type: CalculatorAction.C });

      expect(state).toStrictEqual({ inputOperand: "0" });
    });
  });

  describe("CalculatorAction.InvertSign", () => {
    describe("when state does not include result", () => {
      test("inverts the sign of the input operant", () => {
        state = {
          inputOperand: "2",
        };
        state = CalculatorReducer(state, {
          type: CalculatorAction.InvertSign,
        });
        expect(state).toStrictEqual({
          inputOperand: "-2",
        });
        state = CalculatorReducer(state, {
          type: CalculatorAction.InvertSign,
        });
        expect(state).toStrictEqual({
          inputOperand: "2",
        });
      });
    });
    describe("when state includes result", () => {
      test("takes the resulta as input operant and inverts its sign", () => {
        state = {
          cachedOperand: 4,
          operator: CalculatorOperator.Divide,
          inputOperand: "2",
          result: 2,
        };
        state = CalculatorReducer(state, { type: CalculatorAction.InvertSign });

        expect(state).toStrictEqual({ inputOperand: "-2" });
      });
    });
  });

  describe("CalculatorAction.Result", () => {
    describe("when state does not include operator", () => {
      test("does nothing", () => {
        state = {
          inputOperand: "2",
        };
        state = CalculatorReducer(state, {
          type: CalculatorAction.Result,
        });
        expect(state).toStrictEqual({
          inputOperand: "2",
        });
      });
    });
    describe("when state includes operator", () => {
      test.each([
        { operator: CalculatorOperator.Sum, expected: 8 },
        { operator: CalculatorOperator.Subtract, expected: 4 },
        { operator: CalculatorOperator.Multiply, expected: 12 },
        { operator: CalculatorOperator.Divide, expected: 3 },
      ])(
        "performs the corresponding operation: 6 $operator 2 = $expected",
        ({ operator, expected }) => {
          state = {
            cachedOperand: 6,
            operator,
            inputOperand: "2",
          };
          state = CalculatorReducer(state, {
            type: CalculatorAction.Result,
          });

          expect(state.result).toBe(expected);
        }
      );
    });
  });

  describe("CalculatorAction.Decimal", () => {
    describe("when state does not include result", () => {
      test("adds a decimal separator to the input operand", () => {
        state = {
          inputOperand: "2",
        };
        state = CalculatorReducer(state, {
          type: CalculatorAction.Decimal,
        });
        expect(state).toStrictEqual({
          inputOperand: "2.",
        });
      });
    });
    describe("when state includes result", () => {
      test("resets the state and adds the decimal separator", () => {
        state = {
          cachedOperand: 4,
          operator: CalculatorOperator.Divide,
          inputOperand: "2",
          result: 2,
        };
        state = CalculatorReducer(state, { type: CalculatorAction.Decimal });

        expect(state).toStrictEqual({ inputOperand: "0." });
      });
    });
  });

  describe("CalculatorAction.Backspace", () => {
    describe("when state does not include result", () => {
      describe("when input operand has 1 digit", () => {
        test("sets input operand to 0", () => {
          state = {
            inputOperand: "2",
          };
          state = CalculatorReducer(state, {
            type: CalculatorAction.Backspace,
          });
          expect(state).toStrictEqual({
            inputOperand: "0",
          });
        });
      });
      describe("when input operand has more than 1 digit", () => {
        test("remoes one digit from right side", () => {
          state = {
            inputOperand: "24",
          };
          state = CalculatorReducer(state, {
            type: CalculatorAction.Backspace,
          });
          expect(state).toStrictEqual({
            inputOperand: "2",
          });
        });
      });
    });

    describe("when state includes result", () => {
      test("sets result as input operand", () => {
        state = {
          cachedOperand: 4,
          operator: CalculatorOperator.Divide,
          inputOperand: "2",
          result: 2,
        };
        state = CalculatorReducer(state, { type: CalculatorAction.Backspace });

        expect(state).toStrictEqual({ inputOperand: "2" });
      });
    });
  });

  describe("CalculatorAction.Operator", () => {
    describe("when state has input operand different from 0", () => {
      test("moves the input operand to cached operand and stores the operator", () => {
        state = {
          inputOperand: "2",
        };
        state = CalculatorReducer(state, {
          type: CalculatorAction.Operator,
          operator: CalculatorOperator.Sum,
        });

        expect(state).toStrictEqual({
          cachedOperand: 2,
          operator: CalculatorOperator.Sum,
          inputOperand: "0",
        });
      });
    });
  });

  describe("CalculatorAction.Digit", () => {
    test("number values sets display", () => {
      state = CalculatorReducer(state, {
        type: CalculatorAction.Digit,
        digit: 2,
      });
      state = CalculatorReducer(state, {
        type: CalculatorAction.Digit,
        digit: 5,
      });

      expect(state.inputOperand).toBe("25");
    });
  });
});
