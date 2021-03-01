import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { navigate, updateCart } from '../../redux/reducers/main'
import { findInList, isFalse } from '../../common/functions'
import ButtonCard from '../../components/ButtonCard'

const Cart = (props) => {
  const [menu, setMenu] = useState(0);
  const { cart, menus } = props.redux.main;

  return (
    <div>
      {
        cart.map((ele, num) => {
          let menuItem = findInList(menus, "_id", ele.menuid)
          if (isFalse(menuItem)) return <></>
          menuItem = menus[menuItem]
          console.log(menuItem)
          return (
            <ButtonCard
              image={menuItem.image}
              title={menuItem.name}
              badge={ele.quantity}
              line1={menuItem.description}
              b1={() => props.navigate(`/menu/${ele.menuid}`)}
              b1Name="Edit"
              b2={() => props.updateCart({
                type: "REMOVE_CART",
                data: ele
              })}
              b2Name="Remove"
            />
          )
        })
      }
    </div>
  )
}

const mapStateToProps = redux => ({ redux })
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ navigate, updateCart }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
