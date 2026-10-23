import React, {createContext, useState, useEffect, Children} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ Children }) => {
    const[token,setToken]= useState(localStorage.getItem('token')|| null);
    const [user, SetUser]= useState(JSON.parse(localStorage.getItem('user')) || null);

    const login = () => {
    localStorage.setItem('token',authToken);
    localStorage.setItem('user',JSON.stringify(userData));
    setToken(authToken);
    SetUser(userData);
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    SetUser(null);
};

return(
    <AuthContext.Provider value={{token,user,login,logout}}>{Children}</AuthContext.Provider>
);
};