// modules
import React from 'react';
// assets
import './Footer.css';

function Footer(props) {
  return (
    <footer className="footer">
      <p><a href="https://whykatherine.github.io">Katherine Yang</a> &copy; {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;