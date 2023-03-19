
import axios from 'axios';


const URL = 'http://synapse.viewdns.net:8080/api/';

export function getData(config, db, callback, errorcallback) {
    axios.get(`${URL}${db}/`, config)
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

export function postData(config, db, id, callback, errorcallback) {
    axios.postput(`${URL}${db}/${id}/`, config)
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

export function putData(config, db, id, callback, errorcallback) {
    axios.put(`${URL}${db}/${id}/`, config)
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
export function delData(config, db, id, callback, errorcallback) {
    console.log(`${URL}${db}/${id}/`)
    axios.delete(`${URL}${db}/${id}/`, config)
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