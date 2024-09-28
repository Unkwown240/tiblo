import axios from "axios";
import forge from "forge";

const baseURL = 'http://127.0.0.1:8000/'

const axiosLoginObj = axios.create({
	baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
    }
});

function generateHash(text){
    const md = forge.md.sha256.create()
    md.start()
    md.update(text, "utf8")
    const hashText = md.digest().toHex() 
    return hashText
}     

export default axiosLoginObj