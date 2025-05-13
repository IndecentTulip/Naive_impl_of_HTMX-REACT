import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <script src="src/webcomponent.js"></script>
    <h1>From here everything is inside of React</h1>
=======
>>>>>>> 90aaae8 (webcomponents where to much when I was trying to implement this idea of using React + HTMX together in real project, but turns out you can just use 'useRef()' to basically let React Render item and then let you use that DOM node, because if it you can then tell HTMX to process that node, it's possible to brake this, but it's good enough)
    <App />
  </React.StrictMode>
);

reportWebVitals();

