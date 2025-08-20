import axios from "axios";
import { ProblemsRequestData, ResetPasswordConfirm, UserLogin } from "../types/userTypes";

const envEnviroment = import.meta.env.
let apiUrl: string;

switch (envEnviroment) {
    case "PROD":
        apiUrl = import.meta.env.
        break;

    case "LOCAL":
        apiUrl = import.meta.env.
        break;

    case "TEST":
    default:
        apiUrl = import.meta.env.
        break;
}

export default apiUrl;


export const getAllUserInfo = async (token: string) => {
    const response = await axios.get(`${apiUrl}create_doc_user/get_user_info/`, {
        headers: {
            "Accept-Language": "ru",
            "Authorization": `Token ${token}`
        },
    });
    return response.data;
};
export const getUserPersonalAccountInfo = async (token: string) => {
    const response = await axios.get(`${apiUrl}create_doc_user/get_user_mini_info/`, {
        headers: {
            "Accept-Language": "ru",
            "Authorization": `Token ${token}`
        },
    });
    return response.data;
};

export const userLogin = async (data: UserLogin) => {
    const response = await axios.post(`${apiUrl}create_doc_user/login/`, data, {
        headers: {
            "Accept-Language": "ru",
            "Content-Type": "application/json",
        },
    });
    return response.data;
};
