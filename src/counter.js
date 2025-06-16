export default function setupCounter(element) {
  let counter = 0;
  const setCounter = (count) => {
    counter = count;
    // Create a new text content instead of modifying element directly
    const content = `count is ${counter}`;
    // eslint-disable-next-line no-param-reassign
    element.innerHTML = content;
  };
  element.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
}
