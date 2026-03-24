import axios from "axios";

const isProduction = import.meta.env.PROD;

const api = axios.create({
    // Ensure the URL starts with https:// and ends with /api
    baseURL: isProduction
        ? "https://harry-helpdesk-ai-d0hvc8e2gsbfbueh.centralus-01.azurewebsites.net/api"
        : "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
