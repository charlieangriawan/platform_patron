import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { navigate, updateCart, getMenu, makeOrder } from '../../redux/reducers/main'
import { findInList, isFalse } from '../../common/functions'
import ButtonCard from '../../components/ButtonCard'

const Cart = (props) => {
  const { cart, menus } = props.redux.main;

  useEffect(() => {
    const { localStorage } = window;
    let storageCart = localStorage.getItem('cs206_cart')
    storageCart = storageCart == null ? [] : JSON.parse(storageCart)
    if (storageCart != null) {
      for (let i = 0; i < storageCart.length; i++) {
        if (isFalse(findInList(cart, "menuid", storageCart[i].menuid))) {
          props.updateCart({
            type: "EDIT_CART",
            data: storageCart[i]
          })
        }
      }
    }
  }, [cart, menus])

  const getMenuItem = (uen, id) => {
    let menuItem = findInList(menus, "_id", id)
    if (!isFalse(menuItem)) return menus[menuItem]
    props.getMenu({ uen, id })
  }

  return (
    <div>
      {
        cart && cart.map((ele) => {
          let menuItem = getMenuItem(ele.uen, ele.menuid)
          if (menuItem == null) return <></>
          return (
            <ButtonCard
              image={menuItem.image}
              title={menuItem.name}
              badge={ele.quantity}yap
              line1={`$${ele.quantity*menuItem.price}`}
              b1={() => props.navigate(`/menu/${ele.menuid}`)}
              b1Name="Edit"
              b2={() => {
                const { localStorage } = window;
                let storageCart = JSON.parse(localStorage.getItem('cs206_cart'))
                localStorage.setItem('cs206_cart',
                  JSON.stringify([ ...storageCart.filter((listItem) => listItem.menuid != ele.menuid) ])
                )
                props.updateCart({
                  type: "REMOVE_CART",
                  data: ele
                })
              }}
              b2Name="Remove"
            />
          )
        })
      }
      <div>Total: </div>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => props.makeOrder()}
      >
        Proceed to Payment
      </button>
    </div>
  )
}

const mapStateToProps = redux => ({ redux })
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ navigate, updateCart, getMenu, makeOrder }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
