import { Button } from "./Button";
import { useEffect, useReducer } from "react";

const PersonObj = ({ i, addList, removeList, removePerson }) => {
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
      <Button
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
      <Button btnName="submit" handleClick={sum} />
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

export const InputPerson = ({ addList, removeList }) => {
  const [personList, dispatch] = useReducer(listReducer, [{ key: 0 }]);

  function handleAddList(x, name, val) {
    addList(x, name, val);
  }

  function handleRemoveList(x) {
    removeList(x);
  }

  function addPerson() {
    dispatch({ type: "ADD" });
  }

  function removePerson(index) {
    dispatch({ type: "REMOVE", payload: index });
  }

  return (
    <>
      <div className="clearfix">
        <Button handleClick={addPerson}>+</Button>
      </div>
      {personList.map((p) => (
        <PersonObj
          key={p.key}
          i={p.key}
          addList={handleAddList}
          removeList={handleRemoveList}
          removePerson={removePerson}
        />
      ))}
    </>
  );
};

function listReducer(state, action) {
  switch (action.type) {
    case "ADD":
      let sleng = state.length;
      return [
        ...state,
        {
          key: sleng !== 0 ? state[sleng - 1].key + 1 : sleng,
        },
      ];

    case "REMOVE":
      return state.filter(
        (s) => state[state.indexOf(s)].key !== action.payload
      );

    default:
      throw new Error();
  }
}
