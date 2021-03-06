import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';

import Input from 'react-toolbox/lib/input/Input'
import ReposList from './ReposList'

import { getUser } from './../requests/api'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      key: '',
      login: null,
      error: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(val) {
    this.setState({ key: val })
  }

  handleSubmit(event) {
    this.checkValid()
    event.preventDefault()
  }

  async checkValid() {
    let { key } = this.state

    try {
      const response = await getUser(key)
      window.sessionStorage.setItem('key', key)
      window.sessionStorage.setItem('login', response.login)
      this.setState({ login: response.login })
    } catch (err) {
      this.setState({ error: err.message })
    }
  }

  render() {
    let { key, login, error } = this.state

    return (<div>
        { !login && <form>
          <div className="Container">

            <Input type="text" value={key} onChange={this.handleChange} error={error}></Input>
          </div>
          {/* <Button label="Go" onClick={this.handleSubmit} className="mui-btn mui-btn--primary mui-btn--raised"></Button> */}
          <div className="Container">
            <RaisedButton onClick={this.handleSubmit} primary={true} label="Go" />
          </div>

        </form> }
        { login && <ReposList key={key} login={login} ></ReposList> }
      </div>
    )
  }
}

export default Login
