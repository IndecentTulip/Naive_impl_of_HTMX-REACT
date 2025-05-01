import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './Main';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;

