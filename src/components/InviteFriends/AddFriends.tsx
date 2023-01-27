import React, { FC, useEffect, useRef, useState } from 'react';
import { profileUsers } from '../../hooks/hooks';
import Friend from './Friend';
const AddFriends = () => {
  const [friends, setFriends] = useState(Array());
  const user = profileUsers((state) => state.profileReducer);
  useEffect(() => {
    fetch('https://api.monopoly-dapp.com/users/', { 
      method: 'GET',
      headers: {
          'accept': 'application/json',
          'Authorization': user.authorization,
      },
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      setFriends(json);
    });
  }, []);
  console.log(friends);
  return (
    <div className="invite-friends__board-add-friends">
      <div className="invite-friends__board-container">
        <input
          className="invite-friends__board-add-friends-search"
          type="text"
          placeholder="username"
        />
        <div className="invite-friends__board-add-friends-users">
        {friends.length > 0 ? (
          friends.map((data, index) =>
            <Friend key={index} prors={data} />
          )
        ) : (
          <div></div>
        )}
        </div>
      </div>
    </div>
  );
};

export default AddFriends;
