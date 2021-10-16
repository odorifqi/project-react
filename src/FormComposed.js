import { useState } from "react";

export const ReactForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = () => console.log(name);

  return (
    <Form action="" onSubmit={(ev) => ev.preventDefault()}>
      <Inputan
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      >
        Your name:
      </Inputan>

      <Button type="submit" onClick={handleSubmit}>
        submit
      </Button>
    </Form>
  );
};

const Form = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit}>{children}</form>
);

const Inputan = ({ children, type, onChange, value }) => (
  <label>
    {children}
    <input type={type} value={value} onChange={onChange} />
  </label>
);

const Button = ({ type, onClick, children }) => (
  <button type={type} onClick={onClick}>
    {children}
  </button>
);
