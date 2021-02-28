import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { navigate } from '../redux/reducers/main'
import { findInList, getParam, isFalse } from '../common/functions'
import HCard from '../components/HCard'

const Stall = (props) => {
  const [stall, setStall] = useState(0);

  useEffect(() => {
    let num = null;
    let counter = 0
    do {
      num = findInList(props.redux.main.stalls, "uen", getParam(props.redux.router.location.pathname, "/stall/"));
      if (isFalse(num)) {
        // get hawker
      }
      if (counter++ >= 5) {
        props.navigate(`/404`)
        break;
      }
    } while (num == null || isFalse(num));
    setStall(num);
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
      Stall
      {
        props.redux.main.stalls[stall].menu.map((ele, num) => {
          console.log(ele)
          return (
            <HCard
              image={ele.image}
              onClick={() => props.navigate(`/menu/${ele._id}`)}
              title={ele.name}
              line1={ele.description}
              line2={`Price: S$${ele.price}`}
              l2Class="text-success"
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


export default connect(mapStateToProps, mapDispatchToProps)(Stall);
