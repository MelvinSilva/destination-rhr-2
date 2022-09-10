/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-alert */
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

function Register() {
  const login = useRef();
  const password = useRef();
  const lastname = useRef();
  const firstname = useRef();
  const email = useRef();
  const confirmPassword = useRef();

  const [errorMessage, setErrorMessage] = useState();
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const closeModal = () => setOpen(false);
  const closeModalPassword = () => setPasswordError(false);

  const returnLogin = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (confirmPassword.current.value === password.current.value) {
      axios.post('http://localhost:5001/users/register', {
        cp_number: login.current.value,
        password: password.current.value,
        firstname: firstname.current.value,
        lastname: lastname.current.value,
        email: email.current.value,

      })
        .then(() => {
          setOpen((o) => !o);
          setTimeout(() => {
            returnLogin('/');
          }, 3000);
        }).catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => { // faire disparaitre le message d'erreur au bout de 4 secondes
            setErrorMessage('');
          }, 4000);
        });
    } else setPasswordError((o) => !o);
  };

  return (
    <div className="auth">
      <div className="register">
        <video id="background-video" autoPlay loop muted>
          <source src="./images/production ID_4789847.mp4" type="video/mp4" />
        </video>
        <div className="card-auth">
          <form onSubmit={(e) => handleRegister(e)}>
            <input type="text" placeholder="Numéro de CP*" ref={login} minLength="8" maxLength="8" required />
            <input type="text" placeholder="Nom*" ref={lastname} required />
            <input type="text" placeholder="Prénom*" ref={firstname} required />
            <input type="email" placeholder="Email*" ref={email} required />
            <input type={passwordIsVisible ? 'text' : 'password'} placeholder="Mot de passe*" ref={password} minLength="8" required />
            <p>Minimum 8 caractères avec 1 majuscule, 1 caractère spécial et 1 chiffre</p>
            <i className={passwordIsVisible ? 'password-is-visible-register far fa-eye-slash' : 'password-is-visible-register fa fa-eye'} onClick={() => setPasswordIsVisible(!passwordIsVisible)} onKeyPress="icon" role="button" tabIndex={0} label htmlFor="password-visible" />
            <input type={passwordIsVisible ? 'text' : 'password'} placeholder="Confirmation mot de passe*" ref={confirmPassword} minLength="8" required />
            {errorMessage && (
            <h2>
              🚫
              {' '}
              {errorMessage}
            </h2>
            )}
            <button className="btn" type="submit">
              VALIDER L&apos;INSCRIPTION
            </button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
              <div className="modal2">
                Votre inscription à bien été prise en compte, vous pouvez desormais vous connectez 😁
              </div>
            </Popup>
            <Popup open={passwordError} closeOnDocumentClick onClose={closeModalPassword}>
              {(close) => (
                <div className="modal2">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  ✋ ⛔
                  {' '}
                  <br />
                  {' '}
                  Vos mots de passe ne correspondent pas ! Merci de bien vouloir rééssayer.
                </div>
              )}
            </Popup>
            <Link to="/"><button className="btn-return-home" type="button">RETOUR ACCUEIL</button></Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
