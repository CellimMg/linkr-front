import axios from "axios";
import url from "./server.js"
export async function signUp(data) {
    console.log(url);
    await axios.post(`${url}/sign-up`, data);
}