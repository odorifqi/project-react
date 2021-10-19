import { Button } from "./Button";
import { useState, useEffect } from "react";

const PersonObj = ({ i, setValue }) => {
  const [personName, setPersonName] = useState("");
  const [personInput, setPersonInput] = useState("");
  const [personValue, setPersonValue] = useState(0);

  const sum = () => {
    setPersonValue(() => {
      const val = personInput
        .split(",")
        .reduce((t, v) => parseInt(t) + parseInt(v));
      return isNaN(val) ? alert("not a number") : val;
    });
  };

  useEffect(() => {
    if (personValue || personName) {
      setValue(i, personName, personValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personName, personValue]);

  return (
    <div className="person-div focus">
      <input
        id={"name_" + i}
        className="name-label"
        placeholder="nama"
        type="text"
        value={personName}
        onChange={(e) => setPersonName(e.target.value)}
      />
      <br />
      <input
        type="text"
        name="value"
        id={"value_" + i}
        placeholder="10, 25, 31, ..."
        value={personInput}
        onChange={(e) => setPersonInput(e.target.value)}
      />
      <Button btnName="submit" handleClick={sum} />
      <p>{personValue} kg</p>
    </div>
  );
};

export const InputPerson = ({ personNumber, getPersonData }) => {
  const person = [personNumber];

  const setValue = (x, name, val) => {
    getPersonData(x, name, val);
  };

  for (let i = 0; i < personNumber; i++) {
    person[i] = <PersonObj key={i} i={i} setValue={setValue} />;
  }

  return person;
};
