// Axios config to create a designated URL for server

import axios from "axios";

const api = axios.create ({
    baseURL: "https://api.emjournal.dev",
    withCredentials: true
});

export default api;