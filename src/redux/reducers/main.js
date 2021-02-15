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
      customerId: "1111",
      uen: "2222",
      menuId: "3333",
      status: "cancelled" // in_progress, completed
    }
  ],
  stalls: [
    {
      date: 0,
      uen: "2222",
      name: "name",
      password: "1111",
      operatinghours: {
        monday: { open: 8, close: 17 },
        tuesday: { open: 8, close: 17 },
        wednesday: { open: 8, close: 17 },
        thursday: { open: 8, close: 17 },
        friday: { open: 8, close: 17 },
        saturday: { open: 8, close: 17 },
        sunday: { open: 8, close: 17 }
      },
      menu: [
        {
          name: "name",
          description: "description",
          image: "https://idental.com.sg/wp-content/uploads/soft-food-for-braces-1200x675.png",
          available: true,
          price: 12
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