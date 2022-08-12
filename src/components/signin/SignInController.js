import { signIn } from "../../repositories/authRepository";
import { showError } from "../../utils/alerts";

export async function signInUser(email, password) {
    try {
        const response = await signIn(email, password);
        return response;
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