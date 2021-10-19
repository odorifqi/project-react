import "./App.css";
import { useState, useEffect } from "react";
import { DateToday } from "./component/Date";
import { DetailInput } from "./component/DetailInput";
import { DetailResult } from "./component/DetailResult";
import { InputPerson } from "./component/InputPerson";
import { Button } from "./component/Button";

const App = () => {
  const [personNumber, setpersonNumber] = useState(1);
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState({ perkg: 0, percent: 0 });
  const [personData, setPersonData] = useState({});

  const getPrice = (e) => {
    setPrice({ perkg: e.target[0].value, percent: e.target[1].value });
  };

  const getPersonData = (x, name, val) => {
    setPersonData((prev) => ({ ...prev, [x]: { id: name, value: val } }));
  };

  useEffect(() => {
    console.log("app");
    let total = 0;
    for (const i in personData) {
      total += parseInt(personData[i]["value"]);
    }
    setTotal(() => total);
  }, [personData, setTotal]);

  return (
    <>
      <div className="yellowed">
        <h1>COMMALATOR</h1>
        <DateToday />
      </div>
      <div id="main">
        <div className="main-div">
          <div className="clearfix">
            <Button handleClick={() => setpersonNumber((x) => x + 1)}>+</Button>
          </div>
          <InputPerson
            personNumber={personNumber}
            getPersonData={getPersonData}
          />
          <h2>Total: {total} kg</h2>
        </div>
        <div className="main-div">
          <DetailInput getPrice={getPrice} />
          <DetailResult price={price} total={total} personData={personData} />
        </div>
      </div>
    </>
  );
};

export default App;
