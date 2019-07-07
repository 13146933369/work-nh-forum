import axios from "axios";

// import {showLoading, hideLoading} from './loading.js';
export const publicRequest = (url, parameter, callBack) =>{
    // showLoading();
    axios.get(url, parameter).then((response) => {
        callBack(response)

    })
}

export const publicRequestPost = (url, parameter, callBack) =>{
    axios.post(url,parameter).then((response) => {
        callBack(response)

    })

}