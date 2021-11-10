import { Button } from "./Button";
import { useEffect, useReducer } from "react";

const PersonObj = ({ i, addList, removeList, removePerson }) => {
  const [person, dispatchPerson] = useReducer(personReducer, {
    name: "",
    input: "",
    value: 0,
  });

  function sum() {
    dispatchPerson({
      type: "SET_VALUE",
      payload: () => {
        const val = person.input
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
    if (person.value) {
      addList(i, person.name, person.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person.name, person.value]);

  return (
    <div className="person-div focus">
      <input
        id={"name_" + i}
        className="name-label"
        placeholder="nama"
        type="text"
        value={person.name}
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
        value={person.input}
        onChange={handleInput}
      />
      <Button btnName="submit" handleClick={sum} />
      <p>{person.value} kg</p>
    </div>
  );
};

function personReducer(state, action) {
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
  const [person, dispatch] = useReducer(reducer, [{ key: 0 }]);

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
      {person.map((p) => (
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

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { key: state.length }];
    case "REMOVE":
      return state.filter((s) => s.key !== action.payload);

    default:
      throw new Error();
  }
}
