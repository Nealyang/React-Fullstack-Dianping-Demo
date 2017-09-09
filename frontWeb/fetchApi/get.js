import axios from 'axios'

export function get(url, params = '') {
    if (params)
        return axios(url);
    return axios(url,{params:params})
}