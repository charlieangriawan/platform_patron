import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { navigate, retrieveOrders, getStalls, getMenu } from '../../redux/reducers/main'
import { findInList, isFalse } from '../../common/functions'
import HCard from '../../components/HCard'

const Hawkers = (props) => {
  const { orders, menus, stalls } = props.redux.main
  useEffect(() => {
    if (orders == null) props.retrieveOrders()
  }, [orders, menus, stalls])

  const getMenuItem = (uen, id) => {
    let menuItem = findInList(menus, "_id", id)
    if (!isFalse(menuItem)) return menus[menuItem]
    props.getMenu({ uen, id })
    return null
  }

  const getStall = (uen) => {
    let menuItem = findInList(stalls, "uen", uen)
    if (!isFalse(menuItem)) return menus[menuItem]
    props.getStalls({ uen })
    return null
  }
  return (
    <div>
      <div className="headers" > Orders </div>
      {
        orders && orders.map((ele) => {
          if (ele == null || ele.length < 1) return <></>
          let stall = getStall(ele[0].uen)
          if (stall == null) return <></>
          return (
            <HCard
              image={stall.image}
              onClick={() => {}}
              title={stall.name}
              line1={`Food Orders: ${ele.reduce((prev, curr, index) => {
                const menuItemTemp = getMenuItem(curr.uen, curr.menuId)
                if (menuItemTemp == null) return ""
                return index == 0 ? (
                  menuItemTemp == null ? "" : menuItemTemp.name
                  ) : (
                    prev + menuItemTemp == null ? "" : menuItemTemp.name
                  );
                }, '')}...`}
            />
          )
        })
      }
    </div>
  )
}

const mapStateToProps = redux => ({ redux })
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ navigate, retrieveOrders, getStalls, getMenu }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Hawkers);
