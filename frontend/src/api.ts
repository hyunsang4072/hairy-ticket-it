import axios from "axios";

// Create an Axios instance pointing to our Django local server
const api = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
