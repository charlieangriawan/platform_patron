import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../redux/reducers/main'


const Home = (props) => {
  const [form, setForm] = useState({ phone: "", password: "" })
  const handleLogin = () => {
    console.log(form)
    props.login(form)
  }
  // redirect to a list of all hawker centres
  const handleListOfHawkerCentres = () => {}

  // redirect to the patron's previous order(s)
  const handlePatronsPreviousOrders = () => {}

  return (
    <div class="all-bg">
      <button type="button" className="btn btn-primary btn-lg btn1-main hero-image" style={{ color: "#FFFFFF", fontWeight: 700, fontSize: '16px'}} onClick={handleListOfHawkerCentres}>Hawker Centres</button>
      <button type="button" className="btn btn-primary btn-lg btn2-main hero-image" style={{ color: "#FFFFFF", fontWeight: 700, fontSize: '16px'}} onClick={handlePatronsPreviousOrders}>Previous Orders</button>

    </div>
  )
}

const mapStateToProps = redux => ({ redux })
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);