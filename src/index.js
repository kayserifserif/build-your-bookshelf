// modules
import React from 'react';
import { createRoot } from 'react-dom/client';
// components
import App from './App';
// assets
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);