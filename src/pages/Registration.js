import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { register } from '../redux/reducers/main'

const Registration = (props) => {
  const [form, setForm] = useState({ phone: "", password: "" })
  const handleLogin = () => {
    console.log(form)
    props.register(form)
  }
  return (
    <div className="container border p-3 mt-5">
      <p class="fs-3">Registration</p>
      <div className="mb-3">
        <label for="formGroupExampleInput" className="form-label">Phone</label>
        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="eg.92836172"
          onChange={(e)=>setForm({ ...form, phone: e.target.value })}
          value={form.phone}
        />
      </div>
      <div className="mb-3">
        <label for="formGroupExampleInput2" className="form-label">Password</label>
        <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="eg.2u2jbd%Ts./2"
          onChange={(e)=>setForm({ ...form, password: e.target.value })}
          value={form.password}
        />
      </div>
      <button type="button" class="btn btn-primary btn-lg" onClick={handleLogin}>Registration</button>
    </div>
  )
}

const mapStateToProps = redux => ({ redux })
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ register }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);