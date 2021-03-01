import hawkers from './states/hawker'
import stalls from './states/stalls'
import menus from './states/menus'
export default {
  backend: true,
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
      status: "cancelled", // in_progress, completed
      quantity: 0
    }
  ],
  cart: [
    {
      menuid: "602a2a40139368990648d889",
      quantity: 2,
      specialOrder: "No ketchup"
    }
  ],
  menus: [],
  stalls: [],
  hawkers: []
}