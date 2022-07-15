import { CalculatorState } from "../calculator-reducer";
import "./Display.css";

type Props = { state?: CalculatorState };

function Display({ state }: Props) {
  return (
    <div className="display">
      <p className="display-value">
        {state?.cachedOperand ?? <>&nbsp;</>}
        {state?.operator && (
          <>
            <span>{state?.operator}</span>
            {state?.result ? state?.inputOperand : <></>}
          </>
        )}
      </p>
      <p className="display-input">{state?.result ?? state?.inputOperand}</p>
    </div>
  );
}

export default Display;
