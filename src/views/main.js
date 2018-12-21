import '../styles/views/main.scss';

import axios from 'axios';
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import * as en from 'react-intl/locale-data/en';
import * as zh from 'react-intl/locale-data/zh';
import * as ja from 'react-intl/locale-data/ja';
import { IntlProvider, addLocaleData } from 'react-intl';
import { loadComp, parseCookie, resetPages } from '../util/utils';
import { setTokenAct, friendsAct } from '../actions/loginActions';
import { toggleLoaderAct } from '../actions/uiActions';

// Components
import Header from '../components/header';
import Categories from '../components/categories';
// import Search from './components/search';
import Footer from '../components/footer';

import lang from '../util/lang';

addLocaleData(en);
addLocaleData(zh);
addLocaleData(ja);

// Code splitting
const Home = Loadable({
  loader: () => import('../components/home'),
  loading: loadComp,
});

const SearchList = Loadable({
  loader: () => import('../components/searchList'),
  loading: loadComp,
});

const CatList = Loadable({
  loader: () => import('../components/catList'),
  loading: loadComp,
});

const Details = Loadable({
  loader: () => import('../components/details'),
  loading: loadComp,
});

const EditDetails = Loadable({
  loader: () => import('../components/editDetails'),
  loading: loadComp,
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // Global Axios request interceptor
    axios.interceptors.request.use((config) => {
      // console.log('-- Global Axios request intercep');

      config.headers.token = props.loginState.token;
      return config;
    }, (err) => {
      console.log(err);
    });

    // Global Axios response interceptor
    axios.interceptors.response.use(null, (err) => {
      // console.log('-- Global Axios response intercep');
      console.log(err);

      if (!err.response) { // err.toString() === 'Error: Network Error'
        props.toggleLoaderDispatch('Network error: connection refused');
      } else {
        // For handling cookie expiration
        if (err.response.status === 401 || err.response.status === 403) { // Not authorized
          window.location.hash = '';
        }
        if (err.response.status === 406) { // Email not found / Email or password wrong
          console.log('--', 'Email not found / Email or password wrong');
          console.log(err.response);

          this.props.toggleLoaderDispatch(err.response.data.data);
        }
      }
    });

    // If this is a normal login, token should exist already
    const { token } = this.props.loginState;

    if (!token) {
      const cookieArr = document.cookie.split(';');

      if (cookieArr[0] === '' || cookieArr.length < 2) { // No user cookies found or not enough user info
        window.location.hash = '';
        window.location.reload();
      } else {
        const cookieObj = parseCookie(cookieArr);
        this.props.loginDispatch(cookieObj.token, cookieObj.email, cookieObj.user);
      }
    }
  }

  componentDidMount() {
    document.querySelector('body').className = 'main-bg';

    window.addEventListener('scroll', resetPages, true);
    window.addEventListener('resize', resetPages, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', resetPages, true);
    window.removeEventListener('resize', resetPages, true);
  }

  render() {
    const { uiState } = this.props;

    return (
      <IntlProvider locale={uiState.locale} messages={lang[uiState.locale]} key="en">
        <div className="center">
          <Header />
          <Categories />
          {/* <Search /> */}
          <Switch>
            <Route path="/main/home" component={Home} />
            <Route path="/main/search" component={SearchList} />
            <Route path="/main/details/:id" component={Details} />
            <Route path="/main/:cat" component={CatList} />
          </Switch>
          {uiState.editDetails && <EditDetails />}
          <Footer />
        </div>
      </IntlProvider>
    );
  }
}

const mapStateToProps = store => ({
  uiState: store.uiReducer,
  loginState: store.loginReducer,
  dataState: store.dataReducer,
});

const mapDispatchToProps = dispatch => ({
  loginDispatch: (token, email, user) => {
    dispatch(setTokenAct(token, email, user));
    dispatch(friendsAct(token, email));
  },
  toggleLoaderDispatch: txt => dispatch(toggleLoaderAct(true, txt, false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
