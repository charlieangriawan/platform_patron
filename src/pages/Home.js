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
  return (
    <div>
      HOME
      Favourites, Previous orders

    </div>
  )
}

const mapStateToProps = redux => ({ redux })
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);