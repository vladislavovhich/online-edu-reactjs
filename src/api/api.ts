import axios from "axios";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const Api = axios.create({
    baseURL: `https://${process.env.REACT_APP_API_HOST}`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});
