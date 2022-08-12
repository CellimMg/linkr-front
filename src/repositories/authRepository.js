import axios from "axios";
import url from "./server.js"

export async function signUp(data) {
    await axios.post(`${url}/sign-up`, data);
}

export async function signIn(data) {
    const response = await axios.post(`${url}/sign-in`, data);
    return response;
}

