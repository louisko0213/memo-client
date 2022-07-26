import Axios from 'axios';

// const url = 'http://localhost:3002/user';
const url = 'https://louis-todo-list-backend.herokuapp.com/user';

export const userSignupApi = async (account, password, username) => {
    return Axios.post(`${url}/signup`, {
        account,
        password,
        username
    }).then((response) => response.data);
};

export const userLoginApi = async (account, password) => {
    return Axios.get(`${url}/login`,
        {
            params: {
                account,
                password
            }
        }).then((response) => response.data);
}