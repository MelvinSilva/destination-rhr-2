/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

function Admin() {
  const [users, setUsers] = useState([]);
  const [statut, setStatut] = useState();

  // displayUser permet de réafficher les id non supprimés gràce au filter
  const displayUser = (userId) => {
    const sortedUsers = users.filter((user) => user.id !== userId);
    setUsers(sortedUsers);
  };

  // const refreshPage = () => {
  //   window.location.reload();
  // };

  useEffect(() => {
    axios
      .get('http://localhost:5001/users')
      .then((response) => setUsers(response.data));
  }, []);

  const deleteUser = (userId) => {
    axios
      .delete(`http://localhost:5001/users/${userId}`, { withCredentials: true })
      .then(displayUser(userId));
    close();
  };

  const updateUser = (userId) => {
    if (statut === 'user' || statut === 'admin') {
      axios
        .put(`http://localhost:5001/users/${userId}`, { profil_user: statut }, { withCredentials: true })
        .then(() => axios
          .get('http://localhost:5001/users')
          .then((response) => setUsers(response.data)));
    } else {
      setStatut(statut);
    }
  };

  return (

    <div className="admin">
      <h1>Liste des utilisateurs</h1>
      <div className="delete-card">
        {users.map((user) => (
          <li>
            <div className="user-informations">
              <p>
                Prénom :
                {' '}
                <span>{user.firstname}</span>
              </p>
              <p>
                Nom :
                {' '}
                <span>{user.lastname}</span>
              </p>
              <p>
                Email :
                {' '}
                <span>{user.email}</span>
              </p>
              <p>
                Identifiant :
                {' '}
                <span>{user.cp_number}</span>
              </p>
              <p>
                Rôle :
                {' '}
                <span>{user.profil_user}</span>
              </p>
              <div className="popup">
                <div className="select">
                  <select onChange={(e) => setStatut(e.target.value)} name="statut" id="statut">
                    <option value="">Modifier le rôle de l&apos;utilisateur</option>
                    <option value="user">USER</option>
                    <option value="admin">ADMIN</option>
                  </select>
                </div>
                <div className="button">
                  <Popup
                    trigger={<button className="btn--red">Supprimer l&apos;utilisateur</button>}
                    modal
                    nested
                  >
                    {(close) => (
                      <div className="modal">
                        <button className="close" onClick={close}>
                          &times;
                        </button>
                        <div className="header2">Êtes vous sur de bien vouloir supprimer l&apos;utilisateur ?</div>
                        <div className="actions">
                          <button className="btn" onClick={() => deleteUser(user.id)}> Confirmer </button>
                          <button
                            className="btn--white"
                            onClick={() => {
                              close();
                            }}
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                  <button className="btn" type="button" onClick={() => updateUser(user.id)}>
                    Valider le changement de rôle
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </div>
      <div className="button-bottom">
        <Link to="/home/choice-station"><button className="btn-return-home" type="button">RETOUR ACCUEIL</button></Link>
      </div>
    </div>
  );
}
export default Admin;
