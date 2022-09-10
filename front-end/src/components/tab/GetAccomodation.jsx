/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from 'react';
import {
  IoMail, IoPhonePortrait, IoLocationSharp, IoNavigateCircle,
  IoTime, IoNewspaper, IoColorFilter, IoBeer, IoTv,
} from 'react-icons/io5';
import { FaMugHot } from 'react-icons/fa';
import {
  MdIron, MdMicrowave, MdWifi, MdPedalBike, MdTerrain, MdGames,
} from 'react-icons/md';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Aos from 'aos';
import UpdateAccomodation from './UpdateAccomodation';
import 'aos/dist/aos.css';
import ThemeContext from '../context/ThemeContext';

function GetAccomodation() {
  // l'etat initial toogle est "true" par défaut donc il affiche le composant GetAccomodation
  const [toogle, setToogle] = useState(true);
  const [dataAccomodation, setDataAccomodation] = useState([]);
  const { id_station } = useParams();
  const { theme } = useContext(ThemeContext);

  // withCredentials: true permet d'autoriser et envoyer des données sensibles entre deux serveurs en complement de cors
  useEffect(() => {
    axios
      .get(`http://localhost:5001/accomodations/${id_station}`, { withCredentials: true })
      .then((response) => setDataAccomodation(response.data[0]));
  }, []);

  useEffect(() => { // effet d'apparition ZOOM des cartes
    Aos.init({ duration: 1000 });
  }, []);

  // fonction permet au clik du boutton "Modif les services" de basculer sur le composant "UpdateAccomodation"
  const handleUpdate = () => {
    setToogle(!toogle);
  };

  return (
    <div>
      {toogle
        ? (
          <div className={theme ? 'get-accomodation' : 'get-accomodation-dark'}>
            <div data-aos="zoom-in-up">
              <div className="container-get">
                <div className="card-left">
                  <div className="map">
                    <h2>Localisation</h2>
                    <iframe title="map" src={dataAccomodation.location} allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
                  </div>
                </div>
                <div className="card-center">
                  <h2>
                    {dataAccomodation.accomodation}
                    {' '}
                    -
                    {' '}
                    {`${dataAccomodation.city}`.toUpperCase()}
                  </h2>
                  <div className="infos-get">
                    {dataAccomodation.adress && (
                    <p>
                      <IoLocationSharp />
&nbsp;
                      {' '}
                      {dataAccomodation.adress}
                      ,
                      {' '}
                      {dataAccomodation.postal_code}
                    </p>
                    )}
                    {dataAccomodation.email && (
                    <p>
                      <IoMail />
&nbsp;
                      {' '}
                      {dataAccomodation.email}
                    </p>
                    )}
                    {dataAccomodation.phone_number && (
                    <p>
                      <IoPhonePortrait />
&nbsp;
                      {' '}
                      {dataAccomodation.phone_number}
                    </p>
                    )}
                    {dataAccomodation.distance_station && (
                    <p>
                      <IoNavigateCircle />
&nbsp;
                      {' '}
                      {dataAccomodation.distance_station}
                    </p>
                    )}
                    {dataAccomodation.reception && (
                    <p>
                      <IoTime />
&nbsp;
                      {' '}
                      {dataAccomodation.reception}
                    </p>
                    )}
                    {dataAccomodation.website && (
                    <p>
                      💻
                      <a target="blank" href={dataAccomodation.website}> &nbsp;Site internet</a>
                    </p>
                    )}
                    <img src={dataAccomodation.picture_accomodation} alt="" />
                  </div>
                </div>
                <div className="card-right">
                  <h2>Services inclus</h2>
                  <div className="services-get">

                    {dataAccomodation.e_press === 1 && (
                    <p>
                      <IoNewspaper />
&ensp;E-presse
                    </p>
                    )}
                    {dataAccomodation.bedroom_air_conditioning === 1 && (
                    <p>
                      <IoColorFilter />
&ensp;Climatisation dans la chambre
                    </p>
                    )}
                    {dataAccomodation.kitchen === 1 && (
                    <p>
                      <MdMicrowave />
&ensp;Cuisine équipée
                    </p>
                    )}
                    {dataAccomodation.bereage_dispenser === 1 && (
                    <p>
                      <IoBeer />
&ensp;Distributeur automatique d&apos;encas
                    </p>
                    )}
                    {dataAccomodation.tv_room === 1 && (
                    <p>
                      <IoTv />
&ensp;Salle de télévision
                    </p>
                    )}
                    {dataAccomodation.coffee === 1 && (
                    <p>
                      <FaMugHot />
&ensp;Café à disposition
                    </p>
                    )}
                    {dataAccomodation.iron === 1 && (
                    <p>
                      <MdIron />
&ensp;Fer à repasser
                    </p>
                    )}
                    {dataAccomodation.wifi === 1 && (
                    <p>
                      <MdWifi />
&ensp;Accès internet
                    </p>
                    )}
                    {dataAccomodation.bike === 1 && (
                    <p>
                      <MdPedalBike />
&ensp;Vélos à disposition à l&apos;accueil
                    </p>
                    )}
                    {dataAccomodation.terrace === 1 && (
                    <p>
                      <MdTerrain />
&ensp;Terrasse
                    </p>
                    )}
                    {dataAccomodation.board_games === 1 && (
                    <p>
                      <MdGames />
&ensp;Jeux de sociétés
                    </p>
                    )}
                    <br />
                    <button type="button" onClick={handleUpdate} className="btn">MODIFIER LES SERVICES</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        : <UpdateAccomodation dataAccomodation={dataAccomodation} setDataAccomodation={setDataAccomodation} setToogle={setToogle} />}
      {/* au click sur handleUpdate on va sur updateAccomodation en passant les 3 parametres qu'on va utiliser dans "updateAccomodation" */}
    </div>
  );
}

export default GetAccomodation;
