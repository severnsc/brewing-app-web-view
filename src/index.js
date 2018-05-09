import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppWithApollo from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppWithApollo />, document.getElementById('root'));
registerServiceWorker();
