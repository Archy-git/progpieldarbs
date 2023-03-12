import React from "react";
import "./userinfo.css";

const UserInfo = ({ user }) => {
  return (
    <div className="user-info">
      <h1 className="user-info__title">Hello, {user.username}</h1>
    </div>
  );
};

export default UserInfo;
