import '../styles/components/home.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { loadHomeListsAct } from '../actions/homeActions';
import LatestDetails from './latestDetails';
import RecommDetails from './recommDetails';
import SlideList from './slideList';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.loadHomeListsDispatch();
  }

  render() {
    const { dataState } = this.props;

    return (
      <div className="home">
        <div className="home-section">
          <div className="latest">
            <h1><FormattedMessage id="home.latest" /></h1>
            <div className="latest-details-wrap">
              <LatestDetails />
            </div>
            <div className="latest-list">
              {Object.keys(dataState.latest).length
                ? <SlideList dataRef={dataState.latest} link={true} load={true} vertical={false} del={false} info={false} dots={true} list="latest" ipp="6" carousel={true} />
                : <FormattedMessage id="home.empty" />}
            </div>
          </div>
          <div className="watch-later">
            <h1><FormattedMessage id="home.watch" /></h1>
            {Object.keys(dataState.watchLater).length
              ? <SlideList dataRef={dataState.watchLater} link={false} load={false} vertical={true} del={true} info={true} dots={true} list="main" ipp="4" />
              : <FormattedMessage id="home.empty" />}
          </div>
        </div>

        <div className="home-section">
          <div className="recomm">
            <h1><FormattedMessage id="home.recomm" /></h1>
            <div className="recomm-details-wrap">
              <RecommDetails />
            </div>
            <div className="recomm-list">
              {Object.keys(dataState.recomm).length
                ? <SlideList dataRef={dataState.recomm} link={true} load={true} vertical={false} del={true} info={false} dots={true} list="recomm" ipp="8" carousel={true} />
                : <FormattedMessage id="home.empty" />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  dataState: store.dataReducer,
});

const mapDispatchToProps = dispatch => ({
  loadHomeListsDispatch: () => dispatch(loadHomeListsAct()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
