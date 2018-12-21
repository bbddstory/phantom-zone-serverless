import '../styles/views/login.scss';

import axios from 'axios';

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAct } from '../actions/loginActions';
import { toggleLoaderAct } from '../actions/uiActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: { email: 'leon@gmail.com', pwd: 'leon@gmail.com' } };
    // this.state = { form: { email: '', pwd: '' } };

    // Global Axios request interceptor
    axios.interceptors.request.use((config) => {
      // console.log('-- Global Axios request intercep');

      config.headers.token = this.props.loginState.token;
      return config;
    }, (err) => {
      console.log(err);
    });

    // Global Axios response interceptor
    axios.interceptors.response.use(null, (err) => {
      // console.log('-- Global Axios response intercep');
      console.log(err);

      if (!err.response) { // err.toString() === 'Error: Network Error'
        this.props.toggleLoaderDispatch('Network error: connection refused');
      } else {
        // For handling cookie expiration
        if (err.response.status === 401 || err.response.status === 403) { // Not authorized
          window.location.hash = '';
        }
        if (err.response.status === 406) { // Email not found / Email or password wrong
          console.log(err.response);

          this.props.toggleLoaderDispatch(err.response.data.data);
        }
      }
    });
  }

  componentDidMount() {
    document.body.className = '';
  }

  handleChange(e) {
    if (e.target.name === 'submit') {
      this.props.loginDispatch(this.state.form)
    } else {
      this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value,
        },
      });
    }
  }

  render() {
    const f = this.state.form;

    return (
      <form className="login-form">
        <div className="logo" />
        <input autoFocus type="email" name="email" placeholder="Email" value={f.email}
          onChange={e => this.handleChange(e)} onKeyDown={e => this.handleChange(e)} />
        <input type="password" name="pwd" placeholder="Password" value={f.pwd}
          onChange={e => this.handleChange(e)} onKeyDown={e => this.handleChange(e)} />
        <span className="sign-up">
          <Link to="register">Register</Link>
        </span>
        <input type="button" name="submit" value="Enter"
          onClick={e => this.handleChange(e)} />
      </form>
    );
  }
}

// Here store is the masterStore defined in index.js
const mapStateToProps = store => ({
  uiState: store.uiReducer,
  loginState: store.loginReducer,
});

const mapDispatchToProps = dispatch => ({
  loginDispatch: form => dispatch(loginAct(form)),
  toggleLoaderDispatch: txt => dispatch(toggleLoaderAct(true, txt, false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
