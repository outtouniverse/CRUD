import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import exampleImage from '/src/Illustration.png';
import logo from '/src/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faDownload, faBars } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {


  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="left-side">
        <h1>Share</h1>
        <h1>Discover</h1>
        <h1>Inspire</h1>

        <h4 className='.left-side .txt'>Your digital art Heaven</h4>

        <Link to={`/disp`} className="action-button">Add your Art</Link>
      </div>
      <div className="right-icons">
          <FontAwesomeIcon icon={faHeart} className="icon" />
          <FontAwesomeIcon icon={faDownload} className="icon" />
          <FontAwesomeIcon icon={faBars} className="icon" />
        </div>
      <div className="right-side">
        <img src={exampleImage} alt="Example" />
      </div>
    </div>
  );
};

export default HomePage;
