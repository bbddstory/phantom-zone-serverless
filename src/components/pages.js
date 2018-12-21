import '../styles/components/pages.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import Mousetrap from 'mousetrap';
import { loadPageAct } from '../actions/dataActions';
import { togglePagesAct, switchViewAct } from '../actions/uiActions';
import { pageSettings } from '../util/utils';

class Pages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.numRef = React.createRef();
  }

  componentDidMount() {
    Mousetrap.bind('ctrl+left', e => this.gotoPage('FIRST'));
    Mousetrap.bind('ctrl+right', e => this.gotoPage('LAST'));
    Mousetrap.bind('left', e => this.gotoPage('PREV'));
    Mousetrap.bind('right', e => this.gotoPage('NEXT'));
  }

  componentWillUnmount() {
    Mousetrap.unbind('ctrl+left', e => this.gotoPage('FIRST'));
    Mousetrap.unbind('ctrl+right', e => this.gotoPage('LAST'));
    Mousetrap.unbind('left', e => this.gotoPage('PREV'));
    Mousetrap.unbind('right', e => this.gotoPage('NEXT'));
  }

  setPageNum(e) {
    if (e.which === 13) {
      this.gotoPage(Number(e.target.value));
      this.numRef.current.value = '';
      this.numRef.current.blur();
    }
  }

  gotoPage(page) {
    // const ps = pageSettings();
    let { currPage, startAt, endAt } = pageSettings();
    let load = false;
    const {
      currPage: dataCurrPage,
      pageCnt: dataPageCnt,
      startAt: dataStartAt,
      endAt: dataEndAt,
      itemCnt: dataItemCnt,
      ipp: dataIpp,
    } = this.props.dataState.pages;

    switch (page) {
      case 'FIRST':
        if (dataCurrPage > 1) {
          currPage = 1;
          startAt = 0;
          endAt = dataIpp - 1;
          load = true;
        }
        break;
      case 'LAST':
        if (dataCurrPage < dataPageCnt) {
          currPage = dataPageCnt;
          startAt = dataIpp * (dataPageCnt - 1);
          endAt = dataItemCnt - 1;
          load = true;
        }
        break;
      case 'PREV':
        if (dataCurrPage > 1) {
          currPage = dataCurrPage - 1;
          startAt = dataStartAt - dataIpp;
          endAt = startAt + dataIpp - 1;
          load = true;
        }
        break;
      case 'NEXT':
        if (dataCurrPage < dataPageCnt) {
          currPage = dataCurrPage + 1;
          startAt = dataStartAt + dataIpp;
          endAt = dataEndAt + dataIpp;
          if (endAt > (dataItemCnt - 1)) {
            endAt = dataItemCnt - 1;
          }
          load = true;
        }
        break;
      default: // Go to specific page
        if (page <= dataPageCnt && page >= 1) {
          currPage = page;
          startAt = dataIpp * page - 1;
          endAt = startAt + dataIpp - 1;
          load = true;
        }
        break;
    }

    if (load) {
      this.props.togglePages(false);
      this.props.loadPageDispatch(this.props.dataState.category, currPage, startAt, endAt);
    }
  }

  backToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  render() {
    return (
      <div id="pages">
        <div id="controls">
          <button type="button" className={`ctrl-wrap view-${this.props.uiState.view}`} onClick={e => this.props.switchView()} />
          <div className="ctrl-wrap">
            <button type="button" className="first" onClick={e => this.gotoPage('FIRST')}>❬❬</button>
            <button type="button" onClick={e => this.gotoPage('PREV')}>❬</button>
            <div className="page-no">
              <input type="text" ref={this.numRef} className="page-num-input" placeholder={this.props.dataState.pages.currPage} onKeyUp={e => this.setPageNum(e)} />
              <span className="page-cnt">/&nbsp;{this.props.dataState.pages.pageCnt}</span>
            </div>
            <button type="button" onClick={e => this.gotoPage('NEXT')}>❭</button>
            <button type="button" className="last" onClick={e => this.gotoPage('LAST')}>❭❭</button>
          </div>
          <button type="button" id="back-to-top" className="ctrl-wrap top" onClick={e => this.backToTop()} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  dataState: store.dataReducer,
  uiState: store.uiReducer,
});

const mapDispatchToProps = dispatch => ({
  switchView: () => dispatch(switchViewAct()),
  togglePages: status => dispatch(togglePagesAct(status)),
  loadPageDispatch: (category, currPage, startAt, endAt) => dispatch(loadPageAct(category, currPage, startAt, endAt)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
