import axios from 'axios'
import { push } from 'connected-react-router'
import initState from './initState'

export default function(state = initState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.data
        }
      };
    case 'REMOVE_CART':
      return {
        ...state,
        cart: state.cart.filter((ele) => ele.menuid != action.data.menuid)
      }
    case 'EDIT_CART':
      return {
        ...state,
        cart: [
          ...state.cart.filter((ele) => ele.menuid != action.data.menuid),
          action.data
        ]
      }
    default:
      return state
  }
}

const update = (dispatch, type, data, url=false) => {
  dispatch({ type, data });
  if (url) { dispatch(push(url)); }
}

export const navigate = (url) => {
  return (dispatch) => {
    dispatch(push(url));
  }
}

export const login = (form) => {
  return (dispatch, getState) => {
    if (getState().main.backend) {
      axios({
        method: 'post',
        url: 'https://jiak-api.vitaverify.me/api/v1/customer/auth/login',
        data: form,
        withCredentials: true
      })
        .then(function (res) {
          console.log(res);
          update(dispatch, "LOGIN", form, "/")
        })
        .catch(function (error) {
          console.log(error);
        })
    } else { update(dispatch, "LOGIN", form, "/") }
  }
}

export const register = (form) => {
  return (dispatch, getState) => {
    if (getState().main.backend) {
      axios({
        method: 'post',
        url: 'https://jiak-api.vitaverify.me/api/v1/customer/auth/register',
        data: form,
        withCredentials: true
      })
        .then(function (res) {
          console.log(res);
          update(dispatch, "LOGIN", form, "/")
        })
        .catch(function (error) {
          console.log(error);
        })
    } else { update(dispatch, "LOGIN", form, "/") }
  }
}

export const updateCart = (form) => {
  return (dispatch) => {
    dispatch({ type: form.type, data: form.data });
  }
}









export const getHawkers = (form) => {
  return (dispatch, getState) => {
    if (getState().main.backend) {
      axios({
        method: 'post',
        url: 'https://jiak-api.vitaverify.me/api/v1/customer/map',
        data: form,
        withCredentials: true
      })
        .then(function (res) {
          console.log(res);
          update(dispatch, "LOGIN", form, "/")
        })
        .catch(function (error) {
          console.log(error);
        })
    } else { update(dispatch, "LOGIN", form, "/") }
  }
}

export const getStalls = (form) => {
  return (dispatch, getState) => {
    if (getState().main.backend) {
      axios({
        method: 'post',
        url: 'https://jiak-api.vitaverify.me/api/v1/customer/auth/register',
        data: form,
        withCredentials: true
      })
        .then(function (res) {
          console.log(res);
          update(dispatch, "LOGIN", form, "/")
        })
        .catch(function (error) {
          console.log(error);
        })
    } else { update(dispatch, "LOGIN", form, "/") }
  }
}