import * as React from 'react';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import { syncCatAct, loadPageAct } from '../actions/dataActions';
import { loadComp } from '../util/utils';

// Code splitting
const CardList = Loadable({
  loader: () => import('./cardList'),
  loading: loadComp,
});

class SearchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.loadPage();
  }

  componentDidUpdate() {
    this.loadPage();
  }

  loadPage() {
    const { props } = this;
    const { dataState } = props;

    if (dataState.category !== dataState.prevCat) {
      const { pages } = dataState;

      props.syncCat();
      props.loadPageDispatch(
        pages.category,
        pages.currPage,
        pages.startAt,
        pages.endAt,
      );
    }
  }

  render() {
    const { props } = this;
    const { dataState } = props;

    return (
      <CardList dataRef={dataState.search} usePages={false} />
    );
  }
}

const mapStateToProps = store => ({
  dataState: store.dataReducer,
});

const mapDispatchToProps = dispatch => ({
  syncCat: () => dispatch(syncCatAct()),
  loadPageDispatch: (category, currPage, startAt, endAt) => dispatch(loadPageAct(category, currPage, startAt, endAt)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
