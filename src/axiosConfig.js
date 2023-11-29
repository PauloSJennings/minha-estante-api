const axios = require('axios');

const axiosObject = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1'
})

module.exports = axiosObject;