import React, { createContext, useState, useEffect } from 'react';


export const UserContext = createContext();

//TO DO => Sayfa yenilemelerinde veri sıfırlanıyor. Hatta bazen yönlendirmede bile. Local Storage gibi birşey mi kullanmalıyım? Ya da belki memorization
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


  // const getLocalStorage = () => JSON.parse(localStorage.getItem('user'));  //gizli modda sorun çıkarıyor.
  

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






















/*


export const UserContext = createContext({
    fullName: null,
    email: null,
    token: null,
    image: null,
    logOut: () => {
        UserContext.updateUser({
            fullName: null,
            token: null,
            email: null,
            image: null
        });
    },
    setUser: (prop) => {
        UserContext.setUser({
            ...UserContext,
            user: prop.fullName,
            email: prop.email,
            token: prop.token,
            image: prop.image
        });
    },
});
export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export function useTasks() {
    return useContext(TasksContext);
  }
  
  export function useTasksDispatch() {
    return useContext(TasksDispatchContext);
  }

export function TasksProvider({ children }) {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  
    return (
      <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={dispatch}>
          {children}
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
    );
  }


export default function TaskApp() {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
    
    return (
      <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={dispatch}>
          ...
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
    );
  }


export const themeContext = createContext(false);

//import { ImageSizeContext } from './Context.js';
//const imageSize = useContext(ImageSizeContext);
/*
<ImageSizeContext.Provider
      value={imageSize}
    >

    </ImageSizeContext.Provider>

    */