import axios from "axios";
import { Constants } from "../constants/constants";

const url = Constants.apiUrl;

export const Api = axios.create({
    baseURL: url,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});
