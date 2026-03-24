import axios from "axios";

// Check if we are in production or local development
const isProduction = import.meta.env.PROD;

const api = axios.create({
    // REPLACE THIS with your actual Azure Backend URL (the one ending in .azurewebsites.net)
    baseURL: isProduction
        ? "harry-helpdesk-ai-d0hvc8e2gsbfbueh.centralus-01.azurewebsites.net"
        : "http://localhost:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
