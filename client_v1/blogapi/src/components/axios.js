import axios from "axios";
import axiosLoginObj from "./axiosLogin";
import { useEffect } from "react";
import { Buffer } from 'buffer';

function getCookie(name) {
	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

const baseURL = 'http://127.0.0.1:8000/api/'

const axiosObj = axios.create({
	baseURL: baseURL,
    timeout: 5000,
    headers: {
		'x-csrftoken': getCookie('csrftoken'),
        Authorization: localStorage.getItem("access")
            ? 'Bearer ' +  localStorage.getItem("access") :
			null,
        'Content-Type': 'application/json',
        accept: 'application/json'
    }
});


axiosObj.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
				'Looks like CORS might be the problem. ' +
				'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'auth/revoke-token/' &&
			error.response.statusText === 'Unauthorized'
		) {
			window.location.href = '/login/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh').split('.')[1];
			if (refreshToken) {
				const tokenParts = JSON.parse(Buffer.from(refreshToken, 'base64'));
				const now = Math.ceil(Date.now() / 1000);
				if (tokenParts.exp > now) {
					return axiosLoginObj
						.post('auth/revoke-token/', {
							refresh: localStorage.getItem('refresh')
						})
						.then((response) => {
							localStorage.setItem('access', response.data.access);
							localStorage.setItem('refresh', response.data.refresh);

							axiosObj.defaults.headers['Authorization'] =  'Bearer ' + response.data.access;
							originalRequest.headers['Authorization'] =  'Bearer ' + response.data.access;

							return axiosObj(originalRequest);
						})
						.catch((err) => err);
				} else {
					window.location.href = '/login/';
				}
			} else {
				window.location.href = '/login/';
			}
		}

		// specific error handling done elsewhere
		return 0;
	}
);

export default axiosObj