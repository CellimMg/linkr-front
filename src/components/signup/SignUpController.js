import { toast } from 'react-toastify';
import { signUp } from '../../repositories/authRepository.js';
export async function signUpUser(email, password, name, pictureUrl) {
    try {
        await signUp({ email, password, name, pictureUrl });
    } catch (error) {
        throw error;
    }
}


export function isEmailValid(email) {
    if (email === "") {
        showError("Informe seu email!");
        return false;
    }
    return true;
}

export function isPassValid(pass) {
    if (pass === "") {
        showError("Informe sua senha!");
        return false;
    }
    return true;
}

export function isNameValid(name) {
    if (name === "") {
        showError("Informe seu nome!");
        return false;
    }
    return true;
}

export function isPictureValid(picture) {
    if (picture === "") {
        showError("Informe sua foto!");
        return false;
    }
    return true;
}

export function showError(text) {
    toast.error(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}