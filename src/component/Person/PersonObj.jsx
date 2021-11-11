import { MyButton } from "../Button";
import { useEffect, useReducer } from "react";

export const PersonObj = ({ i, addList, removeList, removePerson }) => {
  const [personObj, dispatchPerson] = useReducer(personObjReducer, {
    name: "",
    input: "",
    value: 0,
  });

  function sum() {
    dispatchPerson({
      type: "SET_VALUE",
      payload: () => {
        const val = personObj.input
          .split(",")
          .reduce((t, v) => parseInt(t) + parseInt(v));
        return isNaN(val) ? alert("not a number") : val;
      },
    });
  }

  function handleName(e) {
    dispatchPerson({ type: "SET_NAME", payload: e.target.value });
  }
  function handleInput(e) {
    dispatchPerson({ type: "SET_INPUT", payload: e.target.value });
  }

  function handleRemove(i) {
    removePerson(i);
    removeList(i);
  }

  useEffect(() => {
    if (personObj.value) {
      addList(i, personObj.name, personObj.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personObj.name, personObj.value]);

  return (
    <div className="person-div focus">
      <input
        id={"name_" + i}
        className="name-label"
        placeholder="nama"
        type="text"
        value={personObj.name}
        onChange={handleName}
      />
      <MyButton
        className="clearfix"
        btnName="x"
        handleClick={() => handleRemove(i)}
      />
      <br />
      <input
        type="text"
        name="value"
        id={"value_" + i}
        placeholder="10, 25, 31, ..."
        value={personObj.input}
        onChange={handleInput}
      />
      <MyButton btnName="submit" handleClick={sum} />
      <p>{personObj.value} kg</p>
    </div>
  );
};

function personObjReducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };

    case "SET_INPUT":
      return { ...state, input: action.payload };

    case "SET_VALUE":
      return { ...state, value: action.payload() };

    default:
      throw new Error();
  }
}
