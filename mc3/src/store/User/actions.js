
import axios from "axios";
import BaseURL from "../../baseUrl";
import firebase from '../firebase_init'
const provider = new firebase.auth.GoogleAuthProvider();
const baseURL = BaseURL.localBaseUrl


export function setInstagramToken(context, obj) {
  context.commit('setInstagramToken', obj);
}

export function setGroupID(context, obj) {
  console.log(obj);
  context.commit('setGroupID', obj);
}

export async function signUpwWithEmailAndPass(context, obj) {
  try {
    const {
      user
    } = await firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password);
    const {
      data
    } = await axios.post(baseURL + '/auth/register', {
      "email": user.email,
      "uid": user.uid
    });
    const result = await axios.post(baseURL + '/auth/login', {
      "email": user.email,
      "uid": user.uid
    })
    const token = result.data.token;
    obj['token'] = token;
    this.$cookies.set("token", token);
    context.commit('setAuthUser', obj);
  } catch (error) {
    console.log("Error SignIn" + error);
  }
}

export async function login(context, obj) {
  try {
    const data = await firebase.auth().signInWithEmailAndPassword(obj.email, obj.password);
    const result = await axios.post(baseURL + '/auth/login', {
      "email": data.user.email,
      "uid": data.user.uid
    })
    const token = result.data.token;
    data['token'] = token;
    this.$cookies.set("token", token);
    context.commit('setAuthUser', data);
  } catch (error) {
    console.log("Error SignIn" + error);
  }
}

export async function auth(context) {
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;

    if (result.additionalUserInfo.isNewUser) {
      const {
        data
      } = await axios.post(baseURL + '/auth/register', {
        "email": user.email,
        "uid": user.uid
      });
    }
    const loginResult = await axios.post(baseURL + '/auth/login', {
      "email": user.email,
      "uid": user.uid
    })
    const token = loginResult.data.token;
    user['token'] = token;
    context.commit('setAuthUser', user);
    return result;
  } catch (error) {
    // Handle Errors here.
    console.log(error);
    var errorCode = error.code;
    var errorMessage = error.message;
  }
}

export function reauth(context) {
  return firebase.auth().getRedirectResult().then(function (result) {
    if (result.credential) {
      // This gives you a Google Access Token.
      // You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      context.commit('setAuthUser', {
        username: user.displayName,
        email: user.email
      });

    }
  }).catch(function (error) {
    // Handle Errors here.
    console.log("error relogging in.")

    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

export function clearAuth(context) {
  firebase.auth().signOut().then(() => {
    context.commit('clearAuthUser');
    console.log("sign out")
  }).catch(() => {
    console.log("error logging out.")
  })
}
