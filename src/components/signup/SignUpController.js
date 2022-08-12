import { showError } from "../../utils/alerts";
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

