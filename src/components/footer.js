import '../styles/components/footer.scss';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { switchLocaleAct } from '../actions/uiActions';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { switchLocaleDispatch } = this.props;

    return (
      <div id="footer">
        <ol>
          <li><Link to="/main/home"><FormattedMessage id="ft.home" /></Link></li>
          <li><a target="_blank" rel="noopener noreferrer" href="http://quickconnect.to/phantomzone"><FormattedMessage id="ft.zone" /></a></li>
          <li><Link to="/main/feedback"><FormattedMessage id="ft.fb" /></Link></li>
          <li>
            <span onClick={e => switchLocaleDispatch('en')}>English</span>|
            <span onClick={e => switchLocaleDispatch('zh')}>中文</span>|
            <span onClick={e => switchLocaleDispatch('ja')}>日本語</span>
          </li>
        </ol>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  uiState: store.uiReducer,
});

const mapDispatchToProps = dispatch => ({
  switchLocaleDispatch: locale => dispatch(switchLocaleAct(locale)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
