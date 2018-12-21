import '../styles/components/slideList.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import { removeHomeListItemAct } from '../actions/homeActions';
import { loadDetailsAct } from '../actions/detailsActions';
import reel from '../images/details/reel.png';

class SlideList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currPage: 0 };
    this.intervalId = null;

    if (props.load) {
      props.loadDetailsDispatch(props.dataRef[0].id, props.list);
    }
  }

  componentDidMount() {
    if (this.props.carousel) {
      this.intervalId = setInterval((showSlides) => {
        clearInterval(showSlides);
        if (this.state.currPage < Math.ceil(this.props.dataRef.length / this.props.ipp) - 1) {
          this.showSlide(this.state.currPage + 1);
        } else {
          this.showSlide(0);
        }
      }, 5000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  showSlide = (i) => {
    this.setState({ currPage: i });
  }

  slides = () => {
    const { dataRef: buffer } = this.props;
    const { ipp } = this.props;
    const slidesStyle = { width: this.props.vertical ? '100%' : `calc(${100 / ipp}% - 20px)` };

    const slides = [];
    let page = [];

    for (let i = 0; i < Math.ceil(buffer.length / ipp); i++) {
      for (let j = 0; j < ipp; j++) {
        const el = buffer[j + i * ipp];

        if (el) {
          page.push(
            <div className="slide" key={j + i * ipp} style={slidesStyle}>
              <div className="poster pulsing-load" onClick={e => this.loadDetails(el.id, this.props.list, !this.props.link)}>
                {this.props.del && <div className="del-item" title="Remove from the list" onClick={e => this.delItem(e, el.id)} />}
                {this.props.link && <div onClick={(e) => { e.stopPropagation(); this.loadDetails(el.id, 'main', true); }} className="link" title="Open full details" />}
                {el.poster && el.poster !== 'N/A'
                  ? <img alt="Poster" src={el.poster} /> : <img alt="Poster" src={reel} />}
              </div>
              {this.props.info && (
              <div className="info">
                <div className="title">{el.eng_title}</div>
                <div className="details">
                  {el.director || el.creator || el.prod}
                  <span className="year">2018{el.year}</span>
                </div>
              </div>)}
            </div>,
          );
        }
      }

      slides.push(
        this.state.currPage === i && (
        <div className={this.state.currPage === i ? 'slides fade-in' : 'slides'} key={i}>
          {page}
        </div>),
      );
      page = [];
    }

    return slides;
  }

  dots = () => {
    const dots = [];

    for (let i = 0; i < Math.ceil(this.props.dataRef.length / this.props.ipp); i++) {
      dots.push(<span className={this.state.currPage === i ? 'currDot' : ''} onClick={e => this.showSlide(i)} key={i} />);
    }

    return (
      <div className="dots">
        {dots}
      </div>
    );
  }

  delItem(e, key) {
    e.preventDefault();
    this.props.removeHomeListItemDispatch(this.props.list, key);
  }

  loadDetails(key, list, jump) {
    this.props.loadDetailsDispatch(key, list);

    if (jump) {
      window.location.hash = `#/main/details/${key}`;
    }
  }

  render() {
    return (
      <div className="slide-list">
        {this.slides()}
        {this.dots()}
      </div>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  loadDetailsDispatch: (key, list) => dispatch(loadDetailsAct(key, list, false)),
  removeHomeListItemDispatch: (list, key) => dispatch(removeHomeListItemAct(list, key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlideList);
