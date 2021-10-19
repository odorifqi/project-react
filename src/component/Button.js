export const Button = ({ btnName, handleClick, children }) => {
  return (
    <button type="button" onClick={handleClick}>
      {btnName || children}
    </button>
  );
};
