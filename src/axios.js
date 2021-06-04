import axios from "axios";

const Instance = axios.create({
    baseURL: 'http://crisscross.projectforexperience.online/api/game/',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
});

export default Instance;
