import { useState, useReducer } from "react";
import Box from "./Box";
import _, { max } from "lodash";
import isEqual from "lodash/isEqual";
const reducer = (state, action) => {
  switch (action.type) {
    case "changed_board": {
      return {
        value: action.value,
      };
    }
    default: {
      console.log("Something is wrong");
    }
  }
};
const reducer_win = (state, action) => {
  switch (action.type) {
    case "changed_array_for_win": {
      return {
        value: action.value,
      };
    }
    default: {
      console.log("Something is wrong2");
    }
  }
};
const reducer_s_win = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "changed_string_for_win": {
      return {
        valueX: action.valueX,
        valueO: action.valueO,
      };
    }
    default: {
      console.log("Something is wrong3");
    }
  }
};

export default function App() {
  const [num, setnum] = useState(0); // for receive value from user
  const [square, setSquare] = useState({}); // set square
  const initialState = { value: {} };
  const [colunm, setcolunm] = useState(0); // set box to colunm
  const [state, dispatch] = useReducer(reducer, initialState); //set value for next play
  const [nextplay, setnextplay] = useState(false); // every play
  const [turn, setturn] = useState(false); //x or o
  const initialwinner = { value: {} };
  const [checkwinner, setwinner] = useReducer(reducer_win, initialwinner); //get value to winner
  const initialstringwin = { value: {} };
  const [stringwin, setstringwin] = useReducer(reducer_s_win, initialstringwin);
  const [another_win, setanotherwin] = useState(false); // check have some one win?
  const [textwin, settextwin] = useState("Let's play you need click input"); //show text for winner
  const [numhis, setnumhistory] = useState(0);
  const [history, sethistory] = useState({});
  const [maxhis, setmaxhis] = useState(0);
  const [maxhis_button, setmaxhis_button] = useState(0);
  const [statehis, setstatehis] = useState(false);
  const [hiddenbutton_r, sethiddenbutton_r] = useState(true);
  const [hiddenbutton_n, sethiddenbutton_n] = useState(true);
  const [count_el, setcount_el] = useState(true);
  function handleChange(e) {
    let num1 = Number(e.target.value);
    // console.log(num1);
    setnum(num1);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(num);
    setcolunm(num);
    setnextplay(false);
    setturn(false);
    setanotherwin(false);
    settextwin("");
    sethistory({});
    setnumhistory(0);
    setstatehis(false);
    setmaxhis(0);
    sethiddenbutton_r(true);
    sethiddenbutton_n(true);
    setmaxhis_button(0);
    setcount_el(1);
    dispatch({
      type: "changed_board",
      value: {},
    });
    setwinner({
      type: "changed_array_for_win",
      value: {},
    });
    setSquare({});
    const loop = num * num;

    setSquare(() => {
      // console.log(...squarea);
      const newSquares = [];
      for (let i = 0; i < loop; i++) {
        const currentSquare = { id: i, st: "" };
        newSquares.push(currentSquare);
      }
      return newSquares;
    });
    sethistory(() => {
      // console.log(...squarea);
      const newSquares = [];
      for (let i = 0; i < loop; i++) {
        const currentSquare = { id: i, array: [] };
        newSquares.push(currentSquare);
      }
      return newSquares;
    });
    function array_set_win() {
      let array1 = [];
      let arrays = [];
      let loop_win = loop;
      let x = 0;
      while (loop_win > 0) {
        loop_win = loop_win - 1;
        array1.push(x);
        x = x + 1;
      }
      // console.log(array1);
      // console.log(num);
      let countx = 0;
      let county = num;
      for (let i = 0; i < num; i++) {
        arrays.push(array1.slice(countx, county));
        // console.log(x);
        countx = countx + num;
        county = county + num;
      }

      let array_c = [];
      for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
          array_c.push(arrays[j][i]);
        }
      }

      countx = 0;
      county = num;
      for (let i = 0; i < num; i++) {
        arrays.push(array_c.slice(countx, county));
        countx = countx + num;
        county = county + num;
      }
      array_c = [];
      for (let i = 0; i < num; i++) {
        // console.log(arrays[i][i]);
        array_c.push(arrays[i][i]);
      }
      arrays.push(array_c);
      array_c = [];
      let j = 0;
      for (let i = num - 1; 0 <= i; i--) {
        // console.log(arrays[j][i]);
        array_c.push(arrays[j][i]);
        j++;
      }
      arrays.push(array_c);
      console.log(arrays);
      return arrays;
    }
    let array_win = array_set_win();
    setwinner({
      type: "changed_array_for_win",
      value: array_win,
    });
    const [string_winX, string_winO] = Stringwin();
    function Stringwin() {
      let newSquaresX = "x";
      let newSquaresO = "o";
      for (let i = 0; i < num - 1; i++) {
        newSquaresX = newSquaresX + "x";
      }
      for (let i = 0; i < num - 1; i++) {
        newSquaresO = newSquaresO + "o";
      }
      return [newSquaresX, newSquaresO];
    }
    setstringwin({
      type: "changed_string_for_win",
      valueX: string_winX,
      valueO: string_winO,
    });
  }

  let cssProperties = {};
  cssProperties["--columns-count"] = colunm;
  // console.log(square);

  function toggle(key) {
    if (another_win === false && statehis === false) {
      let square_clone = [];

      if (nextplay === false) {
        square_clone = square.map((square, index) => {
          // console.log(square.st === " ");
          // const newSquares = [];
          let currentSquare = { id: null, st: null };
          if (square.id === key) {
            // console.log(...squarea);

            currentSquare = { id: square.id, st: "x" };
            // newSquares.push(currentSquare);
          } else {
            currentSquare = { id: square.id, st: " " };
            // newSquares.push(currentSquare);
          }
          // console.log(currentSquare);
          setnextplay(true);

          return currentSquare;
        });
        ////////////////////////////////////
        // [1, 1, 1, 1].every((val, i, arr) => val === arr[0]);
        let his = history.map((square) => {
          if (square.id === numhis && square.array.length === 0) {
            return { ...square, array: square_clone };
          } else {
            return square;
          }
        });
        setnumhistory(numhis + 1);
        sethistory(his);
        ////////////////////////////////////
        // sethistory(...history, square_clone);
      } else if (nextplay === true) {
        square_clone = state["value"].map((square, index) => {
          if (square.id === key && square.st === " ") {
            const square1 = { ...square, st: "x" };
            if (turn === false) {
              const square1 = { ...square, st: "o" };
              setturn(true);
              return square1;
            }
            setturn(false);
            return square1;
          }
          return square;
        });
        // console.log(history);
        ////////////////////////////////////
        let check = true;
        // console.log(history[numhis - 1]["array"]);
        // console.log(history);
        // console.log(_.isEqual(square_clone, history[numhis + 1]["array"]));
        // console.log(history[numhis]);
        // console.log(numhis);
        // console.log(square_clone);
        let his = history.map((square) => {
          // console.log(square);
          // console.log(square["array"] === 0);
          if (
            square.id === numhis &&
            _.isEqual(square_clone, history[numhis - 1]["array"]) === false
          ) {
            setnumhistory(numhis + 1);
            return { ...square, array: square_clone };
          } else {
            return square;
          }
        });
        sethistory(his);
      }
      ////////////////////////////////////
      // console.log(nextplay);
      // console.log(square_clone);
      // console.log(square);
      // console.log(history);
      // console.log(numhis);
      dispatch({
        type: "changed_board",
        value: square_clone,
      });
      // console.log(checkwinner);
      // console.log(state);
      let check = false;

      // console.log(stringwin);
      let count = [];
      for (let i = 0; i < history.length; i++) {
        // console.log(history[i]);
        if (history[i]["array"][i] != null) {
          // console.log(history[i]["array"]
          count.push(history[i]["array"]);
          setmaxhis(count.length);
          setmaxhis_button(count.length);
        }
      }

      //   console.log(maxhis);
      if (maxhis === num * 2 + 1) {
        settextwin("Dual");
        setanotherwin(true);
        setstatehis(true);
        sethiddenbutton_n(false);
      }
      checkwin(checkwinner["value"], square_clone);
      function checkwin(checkwinner, square_clone) {
        for (let i = 0; i < checkwinner.length; i++) {
          const value = checkwinner[i];
          let check_array = [];
          // console.log(square_clone[0]["st"]);

          for (let j = 0; j < value.length; j++) {
            check_array.push(square_clone[value[j]]["st"]);
          }
          console.log(square_clone);
          let trim = "";
          for (let j = 0; j < check_array.length; j++) {
            const element = check_array.join("");
            trim = element.trim();

            if (element === stringwin["valueX"]) {
              // console.log("found x");
              settextwin("X winner");
              setanotherwin(true);
              setstatehis(true);
              sethiddenbutton_n(false);
              //for count and replay
              check = true;
              /////////////////////////////
              break;
            } else if (element === stringwin["valueO"]) {
              // console.log("found o");
              settextwin("O winner");
              setanotherwin(true);
              setstatehis(true);
              sethiddenbutton_n(false);
              //for count and replay

              /////////////////////////////
              break;
            }
          }
          console.log(count_el);
        }
      }
    } else if (another_win === true) {
    }
  }

  //  console.log(nextplay);
  let squareElements = [];
  let button = [];
  if (
    square.length > 0 &&
    nextplay === false &&
    another_win === false &&
    statehis === false
  ) {
    squareElements = square.map((square) => (
      <Box id={square.id} toggle={toggle} />
    ));
  } else if (
    state["value"].length > 0 &&
    nextplay === true &&
    another_win === false &&
    statehis === false
  ) {
    squareElements = state["value"].map((square1) => (
      <Box id={square1.id} toggle={toggle} st={square1.st} />
    ));
  } else if (
    state["value"].length > 0 &&
    another_win === true &&
    statehis === false
  ) {
    squareElements = state["value"].map((square1) => (
      <Box id={square1.id} toggle={toggle} st={square1.st} />
    ));
  } else if (statehis == true) {
    // console.log(maxhis);

    history.map((square1) => {
      console.log(square1);
      // console.log(maxhis);
      if (square1.id === maxhis) {
        squareElements = square1["array"].map((square1) => (
          <Box st={square1.st} toggle={toggle} />
        ));
      }
    });
  }
  let button1 = [];
  if (statehis == true) {
    // button1 = ["return", "next"].map((text) => {
    //   return (
    //     <div>
    //       <button className="box" onClick={() => setvalue(text)}>
    //         {text}
    //       </button>
    //     </div>
    //   );
    // });
    button1 = [
      {
        id: "1",
        value: "Return",
        sethidden: hiddenbutton_r,
        classname: "return",
      },
      { id: "2", value: "Next", sethidden: hiddenbutton_n, classname: "next" },
    ].map((text) => {
      let className = "";
      className += text.classname;
      // console.log(className);
      return (
        <div>
          {text.sethidden && (
            <button className={className} onClick={() => setvalue(text.value)}>
              {text.value}
            </button>
          )}
        </div>
      );
    });
  }
  function setvalue(text) {
    if (text === "Return") {
      console.log(maxhis_button);
      setmaxhis(maxhis - 1);
      if (maxhis === 1) {
        sethiddenbutton_r(false);
        sethiddenbutton_n(true);
      } else {
        sethiddenbutton_n(true);
      }
    } else if (text === "Next") {
      setmaxhis(maxhis + 1);
      console.log(maxhis_button);
      if (maxhis === maxhis_button - 1) {
        sethiddenbutton_n(false);
        sethiddenbutton_r(true);
      } else {
        sethiddenbutton_r(true);
      }
    }
  }
  // function history1(status) {
  //   console.log(status);
  //   switch (status) {
  //     case "backword": {
  //       console.log("h");
  //       setmaxhis(maxhis - 1);
  //     }
  //     case "forword": {
  //       setmaxhis(maxhis + 1);
  //     }
  //   }
  // }
  // console.log(statehis);
  // console.log(history1);
  return (
    <>
      <div className="input">
        <form onSubmit={handleSubmit} className="form" style={cssProperties}>
          <div className="textstatus">{textwin}</div>
          <span className="input1">
            <input
              value={state.name}
              onChange={handleChange}
              className="input2"
            />
          </span>
          <div className="grid" style={cssProperties}>
            {squareElements}
          </div>
        </form>
        <div className="button">{button1}</div>
        {/* {maxhis} */}
      </div>
    </>
  );
}
