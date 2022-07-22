import Axios from 'axios';

const url = 'https://louis-todo-list-backend.herokuapp.com';

export const getMemoListApi = () => {
    return Axios.get(`${url}/fetch`)
        .then(response => response.data);
}

export const getMemoListByIdApi = (id) => {
    return Axios.get(`${url}/fetch/${id}`)
        .then(response => response.data);
}

export const createMemoApi = async (title, content, password, date) => {
    await Axios.post(`${url}/create`, {
        title,
        content,
        password,
        date
    }).then((response) => {
        console.log(response.data);
    })
}

export const updateMemoApi = async (id, title, content, password, date) => {
    await Axios.put(`${url}/update/${id}`, {
        id,
        title,
        content,
        password,
        date
    }).then(() => {
        console.log('update');
    })
}

export const deleteMemoApi = async (id) => {
    await Axios.delete(`${url}/delete/${id}`)
        .then((response) => {
            console.log(response.data);
        })
}

export const checkPasswordApi = async (id, password) => {
    return Axios.get(`${url}/check/${id}`,
        {
            params: { password }
        }
    )
        .then((response) => response.data)
}