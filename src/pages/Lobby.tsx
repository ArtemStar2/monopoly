import React, { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import io from 'socket.io-client';
import { profileUsers } from '../hooks/hooks';
import LobbyItem from '../components/lobby_item';
const Lobby = (dataLobby :any) => {
  const [toggleAreYouReadyPopup, openPrivateGamePopup, openCreateGamePopup] =
    useOutletContext<any>();
  const user = profileUsers((state) => state.profileReducer);
  const [lobby, setLobby] = useState(Array());
  useEffect(() => {
    fetch('https://api.monopoly-dapp.com/lobby/', { 
      method: 'GET',
      headers: {
          'accept': 'application/json',
          'Authorization': user.authorization,
      },
    })
    .then(response => response.json())
    .then(json => {
      if(json.length != lobby.length){
        setLobby(json);
      }
    });
    const interval = setInterval(() => {
      fetch('https://api.monopoly-dapp.com/lobby/', { 
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': user.authorization,
        },
      })
      .then(response => response.json())
      .then(json => {
        if(json.length != lobby.length){
          setLobby(json);
        }
      });
    }, 5000);
    return () => clearInterval(interval);
    
  }, []);
  return (
    <section className="section lobby">
      <div className="lobby__container">
        <div className="lobby__top d-f jc-sb ai-c">
          <div className="lobby__top-left">
            <h2>Lobby</h2>
          </div>
          <div className="lobby__top-right d-f ai-c">
            <h3 className="online d-f ai-c">
              Users online: <b>X,XXX</b>
            </h3>
            <button onClick={() => {
              openCreateGamePopup();
            }}></button>
          </div>
        </div>
        <div className="lobby__board">
          <div className="lobby__board-container">
            <div className="lobby__board-row d-g">
              <div className="lobby__board-column">
                <b>Username</b>
              </div>
              <div className="lobby__board-column">
                <b>Score</b>
              </div>
              <div className="lobby__board-column">
                <b>Funds</b>
              </div>
              <div className="lobby__board-column">
                <b>Status</b>
              </div>
            </div>
            {lobby.length > 0 ? (
              lobby.map((data, index) =>
                <LobbyItem data={dataLobby.funbuff} key={index} prors={data} />
              )
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lobby;
