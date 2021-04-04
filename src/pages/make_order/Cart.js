import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { navigate, updateCart, getMenu, makeOrder } from '../../redux/reducers/main'
import { findInList, isFalse } from '../../common/functions'
import ButtonCard from '../../components/ButtonCard'
import Modal from 'react-modal';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const Cart = (props) => {
  const { cart, menus } = props.redux.main;
  // Modal Variable
  let subtitle;
  const [modalIsOpen,setIsOpen] = useState(false);
  
  const openModal = () => { setIsOpen(true); }
 
  const afterOpenModal = () => { subtitle.style.color = '#006400'; }
 
  const closeModal = () => { setIsOpen(false); }

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
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Order Sent"
      >

        <h2 ref={_subtitle => (subtitle = _subtitle)}>Order Sent</h2>
        <button onClick={closeModal}>close</button>
        <image src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/1200px-Flat_tick_icon.svg.png" />
      </Modal>
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
        onClick={() => {
          props.makeOrder()
          openModal()
        }}
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
