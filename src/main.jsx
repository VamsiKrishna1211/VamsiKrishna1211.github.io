import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Favicon from './components/Favicon/Favicon.jsx'

const updateFavicon = () => {
  const faviconIcon = document.getElementById('favicon-icon');
  if (faviconIcon) {
    const svgData = new XMLSerializer().serializeToString(faviconIcon);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = url;
    document.head.appendChild(link);
  }
};

const setTitle = (title) => {
  document.title = title;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Favicon />
    <App />
  </React.StrictMode>,
);

updateFavicon();
setTitle('Vamsi Krishna Portfolio');
