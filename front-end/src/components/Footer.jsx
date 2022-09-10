/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { RiAdminFill, RiLogoutBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import AuthTokenContext from './context/AuthTokenContext';
import ThemeContext from './context/ThemeContext';

function Footer() {
  const { user } = useContext(AuthTokenContext);
  const { theme } = useContext(ThemeContext);
  const returnHome = useNavigate();
  const [errorConnect, setErrorConnect] = useState();

  const refreshPage = () => {
    window.location.reload();
  };

  const handleLogOut = () => {
    if (confirm('Voulez-vous vraiment vous déconnectez ?')) {
      axios.get('http://localhost:5001/users/logout', { withCredentials: true })
        .then(() => {
          returnHome('/');
          refreshPage();
        }).catch((error) => {
          setErrorConnect(error.response.data.error); // reponse de l'API
        });
    } else {
      alert('Vous êtes toujours connecté');
    }
  };

  return (
    <div className={theme ? 'footer' : 'footer-dark'}>
      <div className="logo-footer-left">
        <a href="https://graou.info/apropos"><img className="logo" src="/images/footer/graou.jpg" alt="logo-graou" /></a>
        <a href="https://www.orfea.fr/fr"><img className="logo" src="/images/footer/orfea.jpg" alt="logo-orfea" /></a>
      </div>
      <div className="infos-footer">
        <div className="logout-admin">
          {user && (
            <span className="link-logout" onClick={handleLogOut}>
              <RiLogoutBoxFill />
              {' '}
              Déconnexion
            </span>
          )}
          {user && user.profil_user === 'admin' && (
            <a className="link-admin" href="/administration">
              <RiAdminFill />
              {' '}
              Administration
            </a>
          )}
        </div>
        <p className="text-dedication">
          Destination RHR by Jean-Mi, Fred, Steph & Melvin
          {' '}
          <br />
          @Wild Code School
        </p>
      </div>
      <div className="logo-footer-right">
        <a href="https://www.sncf-connect.com/"><img className="logo" src="/images/footer/connect.jpg" alt="logo-connect" /></a>
        <a href="https://wit.sncf.fr/"><img className="logo" src="/images/footer/wit.jpg" alt="logo-wit" /></a>
      </div>
    </div>
  );
}

export default Footer;
