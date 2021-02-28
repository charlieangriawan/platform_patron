import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { navigate } from '../redux/reducers/main'
import { findInList, getParam, isFalse, openingHours, isOpen } from '../common/functions'
import HCard from '../components/HCard'

const Hawker = (props) => {
  const [hawker, setHawker] = useState(0);

  useEffect(() => {
    let num = null;
    let counter = 0
    do {
      num = findInList(props.redux.main.hawkers, "_id", getParam(props.redux.router.location.pathname, "/hawker/"));
      if (isFalse(num)) {
        // get hawker
      }
      if (counter++ >= 5) {
        props.navigate(`/404`)
        break;
      }
    } while (num == null || isFalse(num));
    setHawker(num);
  }, [])


  /**
 * 
 * @param {string} image
 * @param {func} onClick
 * @param {string} title
 * @param {string} classname optional
 * @param {string} line1 optional
 * @param {string} line2 optional
 * @param {string} line3 optional
 * @param {string} l1Class classname optional
 * @param {string} l2Class classname optional
 * @param {string} l3Class classname optional
 */

  return (
    <div>
      Hawker
      {
        props.redux.main.hawkers[hawker].stalls.map((ele, num) => {
          const openHours = openingHours(ele.operatinghours);
          console.log(ele)
          return (
            <HCard
              image={ele.image}
              onClick={() => props.navigate(`/stall/${ele.uen}`)}
              title={ele.name}
              line1={`Menu: ${ele.menu.reduce((prev, curr, index) => {
                return index == 0 ? curr.name : prev + ', ' + curr.name;
                }, '')}...`}
              line2={`${isOpen(openHours) ? "OPEN" : "CLOSE"} - ${openHours.open}00 to ${openHours.close}00`}
              l2Class={isOpen(openHours) ? "text-success" : "text-danger"}
            />
          )
        })
      }
    </div>
  )
}

const mapStateToProps = redux => ({ redux })
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ navigate }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Hawker);
