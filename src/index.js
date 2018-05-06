import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppWithRouting from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppWithRouting />, document.getElementById('root'));
registerServiceWorker();
