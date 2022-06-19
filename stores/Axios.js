import { createContext, useState, useEffect, useContext } from 'react';
import { Context } from './Context';
import axios from 'axios';

export const AxiosContext = createContext();

export const Axios = axios.create({
  baseURL: "http://localhost:9000/api",
  withCredentials: true
});


export default function AxiosProvider({ children }) {

  const getMessages = (dmUser) => {
    return new Promise((resolve, reject) => {
      Axios.get(`/message/getmessages?dmuser=${dmUser._id}`).then((response) => {
        resolve(response.data);
      });
    });
  }

  function getUserData() {
    return new Promise((resolve, reject) => {
      Axios.get("/user/getuserdata").then((response) => {
        resolve(response.data);
      });
    });
  }

  function getUsers() {
    return new Promise((resolve, reject) => {
      Axios.get("/user/getusers").then((response) => {
        resolve(response.data);
      });
    });
  }

  return (
    <AxiosContext.Provider value={{ getUserData, getUsers, getMessages }} >
      {children}
    </AxiosContext.Provider>
  )
}

