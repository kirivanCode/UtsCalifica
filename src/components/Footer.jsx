import React from 'react';
import facebookIcon from '../icons/facebook.ico';
import twitterIcon from '../icons/whatsapp.ico';
import instagramIcon from '../icons/instagram.ico';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container" style={{ backgroundColor: '#2c3e50', color: '#ecf0f1', padding: '20px 0', textAlign: 'center' }}>
      <p style={{ margin: '0', fontSize: '14px' }}>Todos los derechos reservados. Copyright © UTS Califica 2024</p>
      <div className="social-icons" style={{ marginTop: '10px' }}>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
          <img src={facebookIcon} alt="Facebook" style={{ width: '30px', height: '30px' }} />
        </a>
        <a href="https://api.whatsapp.com/message" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
          <img src={twitterIcon} alt="WhatsApp" style={{ width: '30px', height: '30px' }} />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
          <img src={instagramIcon} alt="Instagram" style={{ width: '30px', height: '30px' }} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
