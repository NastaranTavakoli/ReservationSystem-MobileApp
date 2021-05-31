import axios from 'axios';

export function search(term: string) {
    return axios.get(`http://www.omdbapi.com/?s=${term}&apikey=4a24f274`)
        .then(response => {
            console.log(response);
            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
}

// axios.get().then(full response).then(only the data).catch(any error)