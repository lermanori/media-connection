import axios from 'axios'
import baseURL from './baseUrl.js'
import routerCtor from './router'
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

export default {
     auth(){
         axios.get(baseURL.localBaseUrl + '/auth').then(()=>{
              return res.data;
          });
    },
    login(){
         window.location.href = baseURL.localBaseUrl + '/auth/google'
         //router.push(baseURL.localBaseUrl + '/auth/google')
        // return axios.get( baseURL.localBaseUrl + '/auth/google',{headers:{'Accsess-Control-Allow-Orgin':'*'}}).then((res)=>{console.log(res);})
    }

}