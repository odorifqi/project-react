import "./App.css";
import { useEffect, useReducer } from "react";
import { DateToday } from "./component/Date";
import { DetailInput } from "./component/DetailInput";
import { DetailResult } from "./component/DetailResult";
import { InputPerson } from "./component/InputPerson";

const App = () => {
  const [data, dispatchData] = useReducer(dataReducer, {
    total: 0,
    price: { perkg: 0, percent: 0 },
    personData: {},
  });

  function getPrice(e) {
    dispatchData({ type: "SET_PRICE", payload: e });
  }

  function addList(x, name, val) {
    dispatchData({
      type: "SET_PERSON_DATA",
      payload: { ...data.personData, [x]: { id: name, value: val } },
    });
  }

  function removeList(x) {
    dispatchData({
      type: "REMOVE_PERSON_DATA",
      payload: x,
    });
  }

  useEffect(() => {
    let total = 0;
    for (const i in data.personData) {
      total += parseInt(data.personData[i]["value"]);
    }
    dispatchData({ type: "SET_TOTAL", payload: total });
  }, [data.personData]);

  return (
    <>
      <div className="yellowed">
        <h1>COMMALATOR</h1>
        <DateToday />
      </div>
      <div id="main">
        <div className="main-div">
          <InputPerson
            personNumber={data.personNumber}
            addList={addList}
            removeList={removeList}
          />
          <h2>Total: {data.total} kg</h2>
        </div>
        <div className="main-div">
          <DetailInput getPrice={getPrice} />
          <DetailResult
            price={data.price}
            total={data.total}
            personData={data.personData}
          />
        </div>
      </div>
    </>
  );
};

export default App;

function dataReducer(state, action) {
  switch (action.type) {
    case "SET_PERSON_NUMBER":
      return { ...state, personNumber: action.payload };
    case "SET_TOTAL":
      return { ...state, total: action.payload };
    case "SET_PRICE":
      return {
        ...state,
        price: {
          perkg: action.payload.target[0].value,
          percent: action.payload.target[1].value,
        },
      };
    case "SET_PERSON_DATA":
      return { ...state, personData: action.payload };
    case "REMOVE_PERSON_DATA":
      return {
        ...state,
        personData: state.personData.filter((s) => {
          return state.personData.indexOf(s) !== action.payload;
        }),
      };

    default:
      throw new Error();
  }
}
