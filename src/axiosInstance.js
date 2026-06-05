import axios from "axios";

export const bookbaseURL = axios.create({
    baseURL: "http://localhost:5600"
});