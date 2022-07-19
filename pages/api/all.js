import Axios from 'axios';

export const getMemoListApi = async () => {
    return Axios.get('http://localhost:3002/fetch')
        .then(response => response.data);
}

export const getMemoListByIdApi = async (id) => {
    return Axios.get(`http://localhost:3002/fetch/${id}`)
        .then(response => response.data);
}

export const createMemoApi = (title, content, password, date) => {
    Axios.post('http://localhost:3002/create', {
        title,
        content,
        password,
        date
    }).then((response) => {
        console.log(response.data);
    })
}

export const updateMemoApi = (id, title, content, password, date) => {
    Axios.put(`http://localhost:3002/update/${id}`, {
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
    Axios.delete(`http://localhost:3002/delete/${id}`)
        .then((response) => {
            console.log(response.data);
        })
}

export const checkPasswordApi = (id, password) => {
    return Axios.get(`http://localhost:3002/check/${id}`,
        {
            params: { password }
        }
    )
        .then((response) => response.data)
}