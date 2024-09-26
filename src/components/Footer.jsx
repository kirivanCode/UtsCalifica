import React from 'react';
import facebookIcon from '../icons/facebook.ico'
import twitterIcon from '../icons/whatsapp.ico'
import instagramIcon from '../icons/instagram.ico'
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <p>Todos los derechos reservados. Copyright © Uts Califica 2024</p>
      <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src={facebookIcon} alt="Facebook" />
        </a>
        <a href="https://api.whatsapp.com/message" target="_blank" rel="noopener noreferrer">
          <img src={twitterIcon} alt="Twitter" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="Instagram" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;