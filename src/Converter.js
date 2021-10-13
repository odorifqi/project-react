import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => (props.colored ? "#ff00ff" : "none")};
`;

const App = () => {
  return (
    <div>
      <h1>Converter</h1>
      <h2>Rupiah to Euro:</h2>
      <Amount>{(amount) => <Euro amount={amount} />}</Amount>
      <h2>Rupiah to Dollar:</h2>
      <Amount>{(amount) => <Dollar amount={amount} />}</Amount>
    </div>
  );
};

export default App;

const Amount = (props) => {
  const [amount, setAmount] = React.useState(0);

  const increment = () => {
    console.log("increment " + amount);
    setTimeout(() => {
      setAmount((state) => state + 1000);
    }, 1000);
  };

  const decrement = () => {
    console.log("decrement " + amount);
    setTimeout(() => {
      setAmount((state) => state - 1000);
    }, 1000);
  };

  const setNumber = (e) => setAmount(parseInt(e.target.value));

  return (
    <div>
      <span>Rupiah: {amount}</span>
      <br />
      <input type="number" name="" id="input" onChange={setNumber} />
      <StyledButton type="button" onClick={increment} colored={true}>
        +
      </StyledButton>
      <button type="button" onClick={decrement}>
        -
      </button>
      {props.children(amount)}
    </div>
  );
};

const Euro = ({ amount }) => <p>Euro: {amount * 0.000061}</p>;
const Dollar = ({ amount }) => <p>Dollar: {amount * 0.00007}</p>;
