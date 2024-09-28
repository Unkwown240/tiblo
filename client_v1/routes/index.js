const express = require('express')
const router = express.Router()
const axios = require('axios')
const fetch = require('fetch')
const Cookies = require('js-cookie')
const CircularJSON = require('circular-json');

//env vars

const tokens = {ACCESS: null, REFRESH: null}
// axios.default.defaults.withCredentials = true;

const post_data = async (req, res, endpoint) => {
        // axios.default.defaults.headers.common = {'X-CSRFToken': toString(req.csrfToken())}
       fetch(`${API_BASE_URL}/${endpoint}`, {
               headers: {
                       'Authorization': `Bearer ${tokens.ACCESS}`
               },
               body: req.body
       }).catch(err => res.send({err: err}))
        const json = JSON.parse(CircularJSON.stringify(apiRES));
        res.status(201).send(json)
}

router.post('/authorize/', async (req, res) => {
       try {
               const config = {
                        headers:{
                                'referer': 'http://localhost:5000',
                                // 'x-csrftoken': 'XUr7sh99Ql6fmZp89HvEN2YAXgbp2cTQOyAbAiD0DhoTEhaqGy1QGZj8nj3ecIzc'
                        },
               }
                const data = {
                        "username": req.body.username,
                        "password": req.body.password,
                        "grant_type": "password",
                        "client_id": CLIENT_ID,
                        "client_secret": CLIENT_SECRET
                }       
                
                const RES = await axios.post(`http://localhost:8000/auth/token/`, data, config)
                console.log(RES)
                tokens.ACCESS = RES.access_token
                tokens.REFRESH = RES.refresh_token
                res.status(200).json({ 'Authorized': true })

       } catch (error) {
               res.send({ 'err': error })
       }
})

router.post('/admin/comment-create/', (req, res) => {post_data(req, res, "/admin/commentCreate/")})

router.post('/admin/comment-update/:id/', (req, res) => {post_data(req, res, `/admin/commentUpdate/${req.params.id}/`)})

router.post('/admin/post-create/:id/', (req, res) => {post_data(req, res, `/admin/create/${req.params.id}/`)})

router.post('/admin/post-update/:id/', (req, res) => {post_data(req, res, `/admin/update/${req.params.id}/`)})

router.post('/admin/post-delete/:id/', (req, res) => {post_data(req, res, `/admin/delete/${req.params.id}/`)})


module.exports = router