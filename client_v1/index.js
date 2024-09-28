const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');
require('dotenv').config();
const { default: axios } = require('axios');

const app = express();

const PORT = 5000;
const API_SERVICE_URL = "http://localhost:8000";
let ACCESS = "";
let REFRESH = "";
let csrftoken = "";
let csrftokenExpires = "";

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

app.use(morgan('dev'));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     next();
// });


const getCookie = (s, name) => {
    const cookies = s[0].split(';');
    let cookieValue = ""
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
        }
    }
    return cookieValue
}

app.post('/authorize', bodyParser.json(), async (req, res) => {
    if (req.body.username && req.body.password) {
        const data = {
            "username": req.body.username,
            "password": req.body.password,
            "grant_type": "password",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET
        }
        const resp = await axios.post(`${API_SERVICE_URL}/auth/token/`, data)
        const csrfResp = await axios.get(`${API_SERVICE_URL}/api/csrf`)
        ACCESS = resp.data.access_token
        REFRESH = resp.data.refresh_token
        res.setHeader('set-cookie', csrfResp.headers['set-cookie'])
        res.send({ 'Success': true })
    }
})

app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/api`]: '',
    },
    onProxyReq: async (proxyReq, req, res) => {
        const dt = new Date()
        if (ACCESS === "") {res.send({'err': 'Un-Authorized'})}
        if (csrftokenExpires <= dt) {
            const csrfResp = await axios.get(`${API_SERVICE_URL}/csrf/`)
            res.setHeader('set-cookie', csrfResp.headers['set-cookie'])
            res.status(403).send({'err': 'Invalid-CSRF'})
        }
        proxyReq.setHeader('Authorization', "Bearer " + ACCESS)
    },
    // onProxyRes: (proxyRes, req, res) => {

    // }
 }));

app.listen(PORT, () => console.log(`Server on PORT ${PORT}`))