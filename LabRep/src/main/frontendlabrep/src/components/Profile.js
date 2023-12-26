
import * as React from 'react';

import { useContext } from "react";
import { UserContext } from "../context/Context";




export default function Profile() {
    const {contextUser, logOut} = useContext(UserContext);
  return (

    <div id="profile-page" style={{ textAlign: "center" }}>
        <h1>MERHABA</h1>
        <h1>{contextUser.fullName}</h1>
        <h3>email: {contextUser.email}</h3>
        <h3>Rol: {contextUser.authorities[0].replace("ROLE_","")}</h3>

        <button onClick={logOut}>Çıkış Yap</button>
    </div>
  );
}
  // const error = useRouteError();