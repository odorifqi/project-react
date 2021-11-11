export function MyButton({ btnName, handleClick, children }) {
  return (
    <button type="button" onClick={handleClick}>
      {btnName || children}
    </button>
  );
}
