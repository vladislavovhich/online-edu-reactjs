import axios from "axios";

export const Api = axios.create({
    baseURL: `http://${process.env.REACT_APP_API_HOST}`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});
