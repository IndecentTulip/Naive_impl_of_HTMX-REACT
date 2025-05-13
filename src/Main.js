import './Main.css';
import Demo1 from './Demo1';
import Demo2 from './Demo2';

const Main = () => {
<<<<<<< HEAD
  // useState creates a piece of state called "count"
  const [count, setCount] = useState(0);

  // This function updates the count when button is clicked
  const handleClick = () => {
    setCount(prevCount => prevCount + 1);
  };


  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>

      <h1>React State Update</h1>
      <p>The count is: <strong>{count}</strong></p>
      <button onClick={handleClick}>Increment</button>

      <div>
        <p>shadow DOM: </p>
        <demo-1 message='DEMO'></demo-1>
        <demo-2></demo-2>
        <demo-3></demo-3>
        <div id="light-dom-output"></div>

=======
  return (
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Elements that contain HTMX</h2>
        <Demo1 />
        <Demo2 />
>>>>>>> 90aaae8 (webcomponents where to much when I was trying to implement this idea of using React + HTMX together in real project, but turns out you can just use 'useRef()' to basically let React Render item and then let you use that DOM node, because if it you can then tell HTMX to process that node, it's possible to brake this, but it's good enough)
      </div>
  );
};

export default Main;

