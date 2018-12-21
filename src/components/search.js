import '../styles/components/search.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import Mousetrap from 'mousetrap';
import lang from '../util/lang';
import { searchAct } from '../actions/searchActions';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
    this.state = { criteria: true };
  }

  componentDidMount() {
    Mousetrap.bind('ctrl+f', e => this.focusSearch(e));
  }

  componentWillUnmount() {
    Mousetrap.unbind('ctrl+f', e => this.focusSearch(e));
  }

  placeholderTxt() {
    return lang[this.props.uiState.locale]['search.txt'];
  }

  // toggleCriteria() {
  //   this.setState({ criteria: !this.state.criteria })
  // }

  handleChange(e) {
    if (e.which === 13) {
      this.props.searchDispatch(e.target.value);
    }
  }

  focusSearch(e) {
    e.preventDefault();
    this.searchRef.current.focus();
  }

  render() {
    return (
      <div id="search">
        <div id="search-box">
          <input
            type="text"
            ref={this.searchRef}
            placeholder={this.placeholderTxt()}
            value={this.state.keyword}
            onChange={e => this.handleChange(e)}
            onKeyDown={e => this.handleChange(e)}
          />
          <div className="mag" />
          {/* <div className="arrow" onClick={e => this.toggleCriteria()}></div> */}
        </div>
        {/* <div className={'criteria ' + (this.state.criteria && 'criteria-hide')}></div> */}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  uiState: store.uiReducer,
});

const mapDispatchToProps = dispatch => ({
  searchDispatch: key => dispatch(searchAct(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
