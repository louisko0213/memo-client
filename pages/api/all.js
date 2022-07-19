import Axios from 'axios';

export const getMemoListApi = async () => {
    return Axios.get('https://louis-todo-list-backend.herokuapp.com/fetch')
        .then(response => response.data);
}

export const getMemoListByIdApi = async (id) => {
    return Axios.get(`https://louis-todo-list-backend.herokuapp.com/fetch/${id}`)
        .then(response => response.data);
}

export const createMemoApi = (title, content, password, date) => {
    Axios.post('https://louis-todo-list-backend.herokuapp.com/create', {
        title,
        content,
        password,
        date
    }).then((response) => {
        console.log(response.data);
    })
}

export const updateMemoApi = (id, title, content, password, date) => {
    Axios.put(`https://louis-todo-list-backend.herokuapp.com/update/${id}`, {
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
    Axios.delete(`https://louis-todo-list-backend.herokuapp.com/delete/${id}`)
        .then((response) => {
            console.log(response.data);
        })
}

export const checkPasswordApi = (id, password) => {
    return Axios.get(`https://louis-todo-list-backend.herokuapp.com/check/${id}`,
        {
            params: { password }
        }
    )
        .then((response) => response.data)
}