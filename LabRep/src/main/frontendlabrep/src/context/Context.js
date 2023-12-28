import React, { createContext, useState, useEffect } from 'react';


export const UserContext = createContext();

export function UserProvider({ children }) {

  const [contextUser, setContextUser] = useState({
    fullName: "",
    email: "",
    token: "",
    image: null,
    authorities: [],
    isEnable: false
  });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('user'));
    if (items) {
      console.log("Local Storage: "+items.fullName);

     setContextUser({
      id: items.id,
      fullName: items.fullName,
      email: items.email,
      token: items.token,
      image: items.image,
      authorities: items.authorities,
      isEnable: (items.isEnable != null)? items.isEnable : false
    });
    }
  }, []);


  const logIn = (userData) => {

    localStorage.setItem('user', JSON.stringify({
      id: userData.user.id,
      fullName: userData.user.fullName,
      email: userData.user.email,
      token: userData.token,
      image: null,
      authorities: userData.user.authorities,
      isEnable: true
    }));

    setContextUser({
      id: userData.user.id,
      fullName: userData.user.fullName,
      email: userData.user.email,
      token: userData.token,
      image: null,
      authorities: userData.user.authorities,
      isEnable: true
    });
  };
  
  const logOut = () => {
    setContextUser({
      id: null,
      fullName: "deleted",
      email: "",
      token: "",
      image: null,
      authorities: [""],
      isEnable: false
    });
    localStorage.setItem('user', JSON.stringify({
      id: null,
      isEnable: false,
      fullName: "deleted",
      email: "",
      token: "",
      image: null,
      authorities: [],
    }));
  };
  
  return (
    <UserContext.Provider value={{ contextUser, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
}
