import axios from "axios";

const Instance = axios.create({
    baseURL: 'http://52.66.249.24/api/game/',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
});

export default Instance;
