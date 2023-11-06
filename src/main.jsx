import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import AOS from 'aos';
import 'aos/dist/aos.css';

import './index.css'
import 'remixicon/fonts/remixicon.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { HashRouter as Router } from 'react-router-dom'
import { StateContext } from './context/StateContext.jsx'

AOS.init();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateContext>
      <Router>
        <App />
      </Router>
    </StateContext>
  </React.StrictMode>,
)
