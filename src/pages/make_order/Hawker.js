import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { navigate, getHawkers } from '../../redux/reducers/main'
import { findInList, getParam, isFalse, openingHours, isOpen } from '../../common/functions'
import HCard from '../../components/HCard'

const Hawker = (props) => {
  const [hawker, setHawker] = useState(0);

  useEffect(() => {
    let num = null;
    num = findInList(props.redux.main.hawkers, "_id", getParam(props.redux.router.location.pathname, "/hawker/"));
    if (isFalse(num)) {
      // get hawker
      props.getHawkers({ id: getParam(props.redux.router.location.pathname, "/hawker/") })
    }
    setHawker(num);
  }, [props.redux.main.hawkers])

  return (
    <div>
      Hawker
      {
        props.redux.main.hawkers[hawker] && props.redux.main.hawkers[hawker].stalls.map((ele, num) => {
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
  return bindActionCreators({ navigate, getHawkers }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Hawker);
