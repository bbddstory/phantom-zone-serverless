import '../styles/components/categories.scss';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { switchCatAct, loadPageAct } from '../actions/dataActions';
import { togglePagesAct } from '../actions/uiActions';
import { CATS, pageSettings } from '../util/utils';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { category } = this.props.dataState;

    return (
      <div id="categories" className="categories">
        <ol>
          <li>
            <Link to="/main/movies" className={category === CATS.movie ? 'active' : ''} onClick={e => this.props.switchCatDispatch(CATS.movie)}>
              <FormattedMessage id="cats.movies" />
            </Link>
          </li>
          <li>
            <Link to="/main/tv" className={category === CATS.tv ? 'active' : ''} onClick={e => this.props.switchCatDispatch(CATS.tv)}>
              <FormattedMessage id="cats.tv" />
            </Link>
          </li>
          <li>
            <Link to="/main/documentaries" className={category === CATS.doc ? 'active' : ''} onClick={e => this.props.switchCatDispatch(CATS.doc)}>
              <FormattedMessage id="cats.docs" />
            </Link>
          </li>
          <li>
            <Link to="/main/animations" className={category === CATS.anime ? 'active' : ''} onClick={e => this.props.switchCatDispatch(CATS.anime)}>
              <FormattedMessage id="cats.anime" />
            </Link>
          </li>
        </ol>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  dataState: store.dataReducer,
});

const mapDispatchToProps = dispatch => ({
  switchCatDispatch: (cat) => {
    const ps = pageSettings();
    dispatch(togglePagesAct(false));
    dispatch(switchCatAct(cat));
    dispatch(loadPageAct(cat, ps.currPage, ps.startAt, ps.endAt));
  },
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Categories));
