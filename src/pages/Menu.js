import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { navigate, updateCart } from '../redux/reducers/main'
import { findInList, getParam, isFalse } from '../common/functions'

const Menu = (props) => {
  const [menu, setMenu] = useState(0);
  const { menus, cart } = props.redux.main;

  const [form, setForm] = useState({
    specialOrder: "",
    amount: 1
  });

  useEffect(() => {
    let num = null;
    let counter = 0
    do {
      num = findInList(menus, "_id", getParam(props.redux.router.location.pathname, "/menu/"));
      if (isFalse(num)) {
        // get hawker
      }
      if (counter++ >= 5) {
        props.navigate(`/404`)
        break;
      }
    } while (num == null || isFalse(num));
    setMenu(num);


    num = findInList(cart, "menuid", getParam(props.redux.router.location.pathname, "/menu/"));
    if (!isFalse(num)) setForm({...form, amount: cart[num].quantity})
  }, [])

  return (
    <div>
      <div className="card m-3 text-start">
        <img
          alt=""
          style={{
            height: "10em",
            width: "100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto 100%",
            backgroundImage: `url(${menus[menu].image}), url(https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg)`
          }}
        />
        <div className="card-body">
          <div className="card-title em-15 fw-bold">{menus[menu].name} <span class="badge bg-secondary">{form.amount}</span></div>
          <div className="card-text">{menus[menu].description}</div>
          <div className="card-text text-success text-bold">{`Price: S$${menus[menu].price}`}</div>
          <div className="form-floating my-3">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{height: "100px"}}
              value={form.specialOrder}
              onChange={e => setForm({...form, specialOrder: e.target.value})}
            />
            <label for="floatingTextarea2">Special Order</label>
          </div>
          <div className="btn-group my-3 d-block" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-primary" onClick={() => setForm({...form, amount: form.amount > 1 ? form.amount - 1 : form.amount})}>-</button>
            <button type="button" className="btn btn-primary" onClick={() => setForm({...form, amount: 1})}>Reset</button>
            <button type="button" className="btn btn-primary" onClick={() => setForm({...form, amount: form.amount + 1})}>+</button>
          </div>
          <div
            onClick={() => props.updateCart({
              type: "EDIT_CART",
              data: {
                menuid: menus[menu]._id,
                quantity: form.amount,
                specialOrder: form.specialOrder
              }
            })}
            className="btn btn-primary"
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = redux => ({ redux })
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ navigate, updateCart }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
