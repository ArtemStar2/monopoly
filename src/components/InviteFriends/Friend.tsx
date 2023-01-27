import React, { FC, useEffect, useRef, useState } from 'react';

const Friend = (prors: any) => {

  console.log(prors.prors);
  return (
    <div className="invite-friends__board-add-friends-row d-g ai-c">
        <div className="invite-friends__board-add-friends-column">
            <img
            src={prors.prors.avatar ?? "https://beebom.com/wp-content/uploads/2022/02/Featured.jpg?w=750&quality=75"}
            alt="avatar"
            />
        </div>
        <div className="invite-friends__board-add-friends-column invite-friends__board-add-friends-column-online">
            <span>{prors.prors.username}</span>
        </div>
        <div className="invite-friends__board-add-friends-column">
            <span>Score: {prors.prors.score}</span>
        </div>
        <div className="invite-friends__board-add-friends-column invite-friends__board-add-friends-column-add"></div>
        </div>
  );
};

export default Friend;
