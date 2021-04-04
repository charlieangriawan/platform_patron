import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { navigate } from '../redux/reducers/main'


const Home = (props) => {
  const [form, setForm] = useState({ phone: "", password: "" })
  // redirect to a list of all hawker centres
  const handleListOfHawkerCentres = () => props.navigate("/hawkers")

  // redirect to the patron's previous order(s)
  const handlePatronsPreviousOrders = () => props.navigate("/orders")

  return (
    <div class="all-bg">
      <button type="button" className="btn btn-primary btn-lg btn1-main hero-image" style={{ color: "#FFFFFF", fontWeight: 700, fontSize: '16px'}} onClick={handleListOfHawkerCentres}>Hawker Centres</button>
      <button type="button" className="btn btn-primary btn-lg btn2-main hero-image" style={{ color: "#FFFFFF", fontWeight: 700, fontSize: '16px'}} onClick={handlePatronsPreviousOrders}>Previous Orders</button>

    </div>
  )
}

const mapStateToProps = redux => ({ redux })
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ navigate }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);