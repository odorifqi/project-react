import "./App.css";
import { useEffect, useReducer } from "react";
import { DateToday } from "./component/Date";
import { DetailInput } from "./component/Detail/DetailInput";
import { DetailResult } from "./component/Detail/DetailResult";
import { InputPerson } from "./component/Person/PersonIndex";

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
      payload: { id: x, name: name, value: val },
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
        <div className="main-div wider">
          <InputPerson addList={addList} removeList={removeList} />
          <div id="div-total-weight">
            <p className="highlight" style={{ fontSize: "1.7em" }}>
              Total
            </p>
            <p id="total">{data.total} kg</p>
          </div>
        </div>
        <div className="main-div wider">
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
      return {
        ...state,
        personData: {
          ...state.personData,
          [action.payload.id]: action.payload,
        },
      };

    case "REMOVE_PERSON_DATA":
      return {
        ...state,
        personData: Object.filter(
          state.personData,
          (s) => s.id !== action.payload
        ),
      };

    default:
      throw new Error();
  }
}

Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});
