
import axios from 'axios';


const URL = 'http://192.168.1.22:8080/api/game/';

export function getData(config, callback, errorcallback) {
    axios.get(URL, config)
        .then(res => {
            //do something
            if (callback != null) {
                callback(res);
            }
        })
        .catch(err => {
            // catch error
            if (errorcallback != null) {
                errorcallback(err);
            }
        })
}

export function postData(config, callback, errorcallback) {
    axios.post(URL, config)
        .then(res => {
            //do something
            if (callback != null) {
                callback(res);
            }
        })
        .catch(err => {
            // catch error
            if (errorcallback != null) {
                errorcallback(err);
            }
        })
}

export function putData(config, id, callback, errorcallback) {
    console.log(`${URL}${id}/`)
    axios.put(`${URL}${id}/`, config)
        .then(res => {
            //do something
            if (callback != null) {
                callback(res);
            }
        })
        .catch(err => {
            // catch error
            if (errorcallback != null) {
                errorcallback(err);
            }
        })
}
export function delData(config, id, callback, errorcallback) {
    console.log(`${URL}${id}/`)
    axios.delete(`${URL}${id}/`, config)
        .then(res => {
            //do something
            if (callback != null) {
                callback(res);
            }
        })
        .catch(err => {
            // catch error
            if (errorcallback != null) {
                errorcallback(err);
            }
        })
}