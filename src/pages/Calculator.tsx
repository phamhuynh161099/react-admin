import { useState } from "react";
import "../assets/scss/styles.scss"; // Nhúng tệp SCSS
const Calculator = () => {
  const [monitor, setMonitor] = useState("");
  const [result, setResult] = useState("");
  const [last, setLast] = useState("");

  const handleClickKeyboard = (value: any) => {
    if (["+", "-", "*", "/"].includes(value)) {
      if (["+", "-", "*", "/"].includes(last)) {
        alert("khong cho phep nhap phep tinh lien tuc");
        return;
      }
    }

    setLast(value);

    if (value === "C") {
      setMonitor("");
      setResult("");
      return;
    }

    // if (value === "=") {
    //   return;
    // }

    if (
      [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "+",
        "-",
        "*",
        "/",
      ].includes(value as string)
    ) {
      setMonitor((prv) => prv + value);
      return;
    }

    if (value === "=") {
      let calc = eval(monitor);
      console.log('run =')
      setResult(calc);

      return;
    }
  };

  return (
    <>
      <div className="cal-wrapper">
        <div className="cal-monitor">{monitor}</div>

        <div className="cal-monitor-result mt-10px">{result}</div>

        <div className="block-keyboard">
          <div className="keyboard" onClick={() => handleClickKeyboard("7")}>
            7
          </div>

          <div className="keyboard" onClick={() => handleClickKeyboard("8")}>
            8
          </div>

          <div className="keyboard" onClick={() => handleClickKeyboard("9")}>
            9
          </div>

          <div className="keyboard" onClick={() => handleClickKeyboard("+")}>
            +
          </div>

          <div className="keyboard" onClick={() => handleClickKeyboard("4")}>
            4
          </div>

          <div className="keyboard" onClick={() => handleClickKeyboard("5")}>
            5
          </div>

          <div className="keyboard" onClick={() => handleClickKeyboard("6")}>
            6
          </div>

          <div className="keyboard" onClick={() => handleClickKeyboard("-")}>
            -
          </div>

          <div className="keyboard" onClick={() => handleClickKeyboard("1")}>
            1
          </div>

          <div className="keyboard" onClick={() => handleClickKeyboard("2")}>
            2
          </div>

          <div className="keyboard" onClick={() => handleClickKeyboard("3")}>
            3
          </div>

          <div className="keyboard" onClick={() => handleClickKeyboard("*")}>
            *
          </div>

          <div className="keyboard" onClick={() => handleClickKeyboard("0")}>
            0
          </div>

          <div className="keyboard" onClick={() => handleClickKeyboard("C")}>
            C
          </div>

          <div className="keyboard" onClick={() => handleClickKeyboard("=")}>
            =
          </div>

          <div className="keyboard" onClick={() => handleClickKeyboard("/")}>
            /
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
