import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { navigate } from '../redux/reducers/main'
import HCard from '../components/HCard'

const Hawker = (props) => {

  useEffect(() => {
    if (props.redux.main.hawkers.length < 1) {
      // make request
    }
  }, [])

  return (
    <div>
      Hawkers
      {
        props.redux.main.hawkers.map((ele) => {
          return (
            <HCard
              image={ele.image}
              onClick={() => props.navigate(`/hawker/${ele._id}`)}
              title={ele.name}
              line1={`Stalls: ${ele.stalls.reduce((prev, curr, index) => {
                return index == 0 ? curr.name : prev + ', ' + curr.name;
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
  return bindActionCreators({ navigate }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Hawker);
