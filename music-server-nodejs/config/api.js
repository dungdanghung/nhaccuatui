const axios = require('axios');
require('dotenv').config()

const BASE_URL = process.env['BASE_URL']

const request = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

module.exports = {
    request
}