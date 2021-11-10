export function Button({ btnName, handleClick, children }) {
  return (
    <button type="button" onClick={handleClick}>
      {btnName || children}
    </button>
  );
}
