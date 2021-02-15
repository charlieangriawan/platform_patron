import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../redux/reducers/main'


const Login = (props) => {
  const [form, setForm] = useState({ phone: "", password: "" })
  const handleLogin = () => {
    console.log(form)
    props.login(form)
  }
  return (
    <div>
      HOME
    </div>
  )
}

const mapStateToProps = redux => ({ redux })
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);