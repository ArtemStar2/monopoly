import React from 'react';
import { useState, ChangeEvent, useEffect} from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { authSlice } from '../store/reducers/authReducer';
import { profileSlice } from '../store/reducers/profileReducer';
import { useAppDispatch, profileUsers,useLocalStorage, useCookie } from '../hooks/hooks';
import axios from "axios";
const Profile = () => {
  const dispatch = useAppDispatch();

  const { setWalletAddress,setUsersData } = profileSlice.actions;
  const { setIsAuth } = authSlice.actions;
  const users = profileUsers((state) => state.profileReducer);
  var adress = users.walletAddress + "";
  useLocalStorage('authorization', users.authorization);

  const disconectWallet = async () => {
    if (window.ethereum) {
      try {
        fetch('https://api.monopoly-dapp.com/auth/', { 
          headers: {
            Accept: "application/json",
            Authorization: users.authorization,
          },
          method: "DELETE"
        })
        .then(response => response.json())
        .then(json => {
          // console.log(json);
        });
        dispatch(setWalletAddress(''));
        dispatch(setIsAuth(false));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('did not detected');
    }
  };
  // Изменение имени
  const [name, setName] = useState(users.username);
  const inputChange = async (value: string) =>{
    const valueLast = value.trim().replace(/[а-яА-ЯёЁ]/g, '');
    setName(valueLast);
  }
  const offInput = (value: string) =>{
    if(value.length < 4){
      setName(users.username);
    }else{
      if(value != users.username){
        setName(value);
        fetch('https://api.monopoly-dapp.com/users/', { 
          method: 'PUT',
          headers: {
              'accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': users.authorization,
          },
          body: 'username=' + value,
        })
        .then(response => response.json())
        .then(json => {
          dispatch(setUsersData(json));
          console.log(json);
        });
      }
    }
  } 
  // Изменение фотографии
  const [image, setImage] = useState(users.avatar);
  const onChange = async (file: ChangeEvent) => {
      const { files } = file.target as HTMLInputElement;
      if (files && files.length !== 0) {
        const formData = new FormData();
        formData.append('avatar', files[0]);
        const res = await fetch("https://api.monopoly-dapp.com/users/", {
          method: "PUT",
          headers: {
            'accept': 'application/json',
            'Authorization': users.authorization,
          },
          body: formData,
        }).then((res) => res.json());
        console.log(res);
        setImage(res.avatar);
      }
  }

  const handleUpload = async () => {
    
  }

  return (
    <section className="profile section">
      <div className="profile__container">
        <div className="profile__row ">
          <label className="profile__column myPhoto">
            <input type="file" name="avatar" onChange={onChange} />
            {image ? (
              <img src={image} alt="avatar" />
            ) : (
              <></>
            )}
          </label>
          <div className="profile__column">
            <p className='profile__name myInput'>{name}<input className="profile__name" onBlur={e => offInput(e.target.value)} value={name} type="text" onChange={e => inputChange(e.target.value)}/></p>
            <p className="profile__score">Score {users.score}</p>
            <p className="profile__address" onClick={() => {
              navigator.clipboard.writeText(adress);
              alert('Copy address');
            }}>Copy address [{adress.substring(0, 5)}...{adress.substring(adress.length - 4)}]</p>
          </div>
          <p className="profile__logout" onClick={disconectWallet}></p>
          <div className="profile__social-rows">
            <div className="profile__social-row    d-f ai-c">
              <div className="profile__social-row-right profile__social-row-right--connect"></div>
            </div>
            <div className="profile__social-row d-f ai-c">
              <div className="profile__social-row-right profile__social-row-right--connected ">
                {/* <span>Sample_Unlink</span> */}
              </div>
            </div>
            <div className="profile__social-row   d-f ai-c">
              <div className="profile__social-row-right profile__social-row-right--connect"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
