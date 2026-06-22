import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import { Provider } from 'react-redux';
import store from './redux/store.js';
const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
<Provider store={store}>
<App />
</Provider>
</StrictMode>
    );
