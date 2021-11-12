import { MyButton } from "../Button";
import { useReducer } from "react";
import { PersonObj } from "./PersonObj";

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
        <MyButton handleClick={addPerson}>+</MyButton>
      </div>
      {personList.map((p) => (
        <PersonObj
          key={`person_${p.key + 1}`}
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
