import axios from 'axios';

// Change port depending on where backend is running
export default axios.create({
    baseURL: 'http://localhost:3001'
});