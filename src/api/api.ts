import axios from 'axios';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

export const Api = axios.create({
    baseURL: "http://localhost:8080/",
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
});