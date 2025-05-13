import './Main.css';
import Demo1 from './Demo1';
import Demo2 from './Demo2';

const Main = () => {
  return (
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <Demo1 />
        <Demo2 />
      </div>
  );
};

export default Main;

