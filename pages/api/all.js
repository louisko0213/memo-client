import Axios from 'axios';

const url = 'https://louis-todo-list-backend.herokuapp.com';

export const getMemoListApi = async () => {
    return Axios.get(`${url}/fetch`)
        .then(response => response.data);
}

export const getMemoListByIdApi = async (id) => {
    return Axios.get(`${url}/fetch/${id}`)
        .then(response => response.data);
}

export const createMemoApi = (title, content, password, date) => {
    Axios.post(`${url}/create`, {
        title,
        content,
        password,
        date
    }).then((response) => {
        console.log(response.data);
    })
}

export const updateMemoApi = (id, title, content, password, date) => {
    Axios.put(`${url}/update/${id}`, {
        id,
        title,
        content,
        password,
        date
    }).then(() => {
        console.log(updated);
    })
}

export const deleteMemoApi = (id) => {
    Axios.delete(`${url}/delete/${id}`)
        .then((response) => {
            console.log(response.data);
        })
}

export const checkPasswordApi = (id, password) => {
    return Axios.get(`${url}/check/${id}`,
        {
            params: { password }
        }
    )
        .then((response) => response.data)
}