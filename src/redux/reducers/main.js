import axios from 'axios'
import { push } from 'connected-react-router'

const initState = {
  backend: false,
  user: {
    date: 0,
    phone: "",
    email: "",
    password: ""
  },
  map: {
    name: "",
    image: "",
    coordinates: [
      {
        uen: "",
        mapId: "",
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
      }
    ],
    tables: [
      {
        mapId: "",
        number: 0,
        coordX: 0,
        coordY: 0
      }
    ]
  },
  orders: [
    {
      customerId: "",
      uen: "",
      menuId: "",
      status: ""
    }
  ],
  stalls: [
    {
      date: 0,
      uen: "",
      name: "",
      password: "",
      operatinghours: {
        monday: { open: 0, close: 0 },
        tuesday: { open: 0, close: 0 },
        wednesday: { open: 0, close: 0 },
        thursday: { open: 0, close: 0 },
        friday: { open: 0, close: 0 },
        saturday: { open: 0, close: 0 },
        sunday: { open: 0, close: 0 }
      },
      menu: [
        {
          name: "",
          description: "",
          image: "",
          available: false,
          price: 0
        }
      ]
    }
  ]
}

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
    default:
      return state
  }
}

const update = (dispatch, type, data, url=false) => {
  dispatch({ type, data });
  if (url) { dispatch(push(url)); }
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