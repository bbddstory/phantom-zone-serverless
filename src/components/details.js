import '../styles/components/details.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import Mousetrap from 'mousetrap';
import { toggleEditDetailsAct } from '../actions/uiActions';
import { watchLaterAct, recommAct, loadDetailsAct } from '../actions/detailsActions';

import closedCap from '../images/details/ic_closed_caption_white_24px.svg';
import imdb from '../images/details/imdb.svg';
import douban from '../images/details/douban.png';
import mtime from '../images/details/mtime.png';
import reel from '../images/details/reel.png';
import format from '../images/details/baseline-movie-24px.svg';
import size from '../images/details/baseline-sd_card-24px.svg';
import resolution from '../images/details/baseline-4k-24px.svg';
import colour from '../images/details/baseline-color_lens-24px.svg';
import videoCodec from '../images/details/baseline-settings_input_svideo-24px.svg';
import audioCodec from '../images/details/baseline-audiotrack-24px.svg';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opts: false,
      recomm: false,
      title: '',
      comment: '',
      showComment: false,
    };
    const { match: { params } } = this.props;
    this.props.loadDetailsDispatch(params.id, 'main');
  }

  componentDidMount() {
    Mousetrap.bind('f2', e => this.props.editDetailsDispatch(true, false));
  }

  componentWillUnmount() {
    Mousetrap.unbind('f2', e => this.props.editDetailsDispatch(true, false));
  }

  friends = (vid) => {
    const { props } = this;
    const { loginState } = props;
    const friends = [];

    loginState.friends.forEach((f, i) => {
      friends.push(
        <li key={f.email} onClick={e => props.recommDispatch(vid, f.email)}>
          {f.name}&nbsp;(<span>{f.email}</span>)
        </li>,
      );
    });

    return friends;
  }

  toggleRecomm() {
    const { recomm } = this.state;
    this.setState({ recomm: !recomm });
  }

  // commentFocus() {
  //   this.setState({ showComment: true });
  // }

  // cancelComment() {
  //   this.setState({ title: '', comment: '', showComment: false });
  // }

  // titleChange(e) {
  //   this.setState({ title: e.target.value });
  // }

  // commentChange(e) {
  //   this.setState({ comment: e.target.value });
  // }

  // submitComment() {
  //   if (this.state.title && this.state.comment) {
  //     let t = new Date();
  //     this.props.commentDispatch({
  //       [t.getTime()]: {
  //         time: t.getFullYear() + '.' + (t.getMonth() + 1) + '.' + t.getDate(),
  //         title: this.state.title,
  //         txt: this.state.comment,
  //         user: this.props.loginState.user
  //       }
  //     });
  //     this.cancelComment();
  //   }
  // }

  render() {
    const { recomm } = this.state;
    const { props } = this;
    const { dataState } = props;
    const { main: item } = dataState.details;

    if (item) {
      return (
        <React.Fragment>
          <div className="video-details">
            <div className="poster">
              {item.poster && item.poster !== 'N/A'
                ? <img alt="Poster" src={item.poster} /> : <img alt="No poster available" src={reel} />}
            </div>

            <div className="info">
              <span className="title">{item.eng_title}</span>
              <span className="orig-title">
                {item.orig_title === null || item.orig_title === '' || item.orig_title === 'N/A' || item.eng_title === item.orig_title
                  ? '' : `${item.orig_title} (original title)`}
              </span>
              <span className="misc">
                Type: Adventure, History<br />
                Year: {item.year}<br />
                Runtime: {item.runtime || 'N/A'}<br />
                {item.director && item.director !== 'null' ? `Directors: ${item.director || 'N/A'}` : `Creators: ${item.creator || 'N/A'}`}<br />
                Stars: {item.stars || 'N/A'}<br />
                Language: English
              </span>
              <div className="actions">
                <div className="watch-later" title="Watch later" onClick={e => this.props.watchLaterDispatch(item.id)} />
                <div className="recomm" title="Recommend to friends" onClick={e => this.toggleRecomm()}></div>
                <a target="_blank" rel="noopener noreferrer" title="Search for subtitles on Subscene" href={`https://subscene.com/subtitles/title?q=${item.eng_title.replace(' ', '+')}`}>
                  <img src={closedCap} alt="CC" />
                </a>
                <div className="edit" title="Edit details" onClick={e => this.props.editDetailsDispatch(true, false)} />
                {recomm && <ul className={recomm ? 'fade-in' : ''}>{this.friends(item.id)}</ul>}
              </div>
            </div>

            <div className="plot">
              <div className="plot-txt">{item.plot || 'Plot unavailable.'}</div>
              <div className="sites">
                <a target="_blank" rel="noopener noreferrer" title="Search on IMDB" href={item.imdb
                  ? `http://www.imdb.com/title/${item.imdb}` : `https://www.imdb.com/find?ref_=nv_sr_fn&q=${item.eng_title.replace(' ', '+')}`}
                >
                  <img src={imdb} className="imdb" alt="IMDB Link" />
                </a>
                <a target="_blank" rel="noopener noreferrer" title="Search on Douban" href={item.douban
                  ? `https://movie.douban.com/subject/${item.douban}` : `https://movie.douban.com/subject_search?search_text=${item.eng_title.replace(' ', '+')}`}
                >
                  <img src={douban} className="douban" alt="Douban Link" />
                </a>
                <a target="_blank" rel="noopener noreferrer" title="Search on Mtime" href={item.mtime
                  ? `http://movie.mtime.com/${item.mtime}` : `http://search.mtime.com/search/?q=${item.eng_title}`}
                >
                  <img src={mtime} className="mtime" alt="Mtime Link" />
                </a>
              </div>
            </div>
          </div>

          <h1>Video Specs</h1>
          <div className="tech-specs">
            <span>
              <span className="property">Resource Name:</span>Yabu.no.naka.no.kuroneko.1968.CC.BluRay.720p.x264.FLAC-CMCT.mkv
            </span>
            <div className="tech-details">
              <div>
                <span className="entry">
                  <img src={format} alt="Format" />
                  <span><span className="property">Format:</span>MKV / MP4 / AVI</span>
                </span>
                <span className="entry">
                  <img src={size} alt="Size" />
                  <span><span className="property">File Size:</span>1.5GB</span>
                </span>
              </div>
              <div>
                <span className="entry">
                  <img src={resolution} alt="Resolution" />
                  <span><span className="property">Resolution:</span>1920 x 1280</span>
                </span>
                <span className="entry">
                  <img src={colour} alt="Video Format" />
                  <span><span className="property">Colour:</span>Colour / Black and White</span>
                </span>
              </div>
              <div>
                <span className="entry">
                  <img src={videoCodec} alt="Video Codec" />
                  <span><span className="property">Video Codec:</span>h264 / h265</span>
                </span>
                <span className="entry">
                  <img src={audioCodec} alt="Audio Codec" />
                  <span><span className="property">Audio Codec:</span>aac / ac3 / dts</span>
                </span>
              </div>
            </div>
          </div>

          <h1>Trailer and featurette</h1>
          <div className="videos">
            {item.trailer === 'null' || item.trailer === '' || item.trailer === null
              ? <div className="no-video">No video</div> : <iframe title="trailer" width="49%" height="329" 
              src={`https://www.youtube.com/embed/${item.trailer}?rel=0&amp;showinfo=0`} frameBorder="0" allowFullScreen />}
            {item.trailer === 'null' || item.trailer === '' || item.trailer === null
              ? <div className="no-video">No video</div> : <iframe title="featurette" width="49%" height="329" 
              src={`https://www.youtube.com/embed/${item.featurette}?rel=0&amp;showinfo=0`} frameBorder="0" allowFullScreen />}
          </div>
          <div className="youtube-lnk">
            <a target="_blank" rel="noopener noreferrer" href={`https://www.youtube.com/results?search_query=${item.eng_title}`}>More videos on YouTube</a>
          </div>

          {/* <h1>Comments</h1>

          <div className="add-comment">
            <input className={showComment ? "comment-title" : "comment-title-lt"} type="text" placeholder={showComment ? "Title" : "Add a public comment..."} value={this.state.title} onChange={e => this.titleChange(e)} onFocus={e => this.commentFocus()} />
            {showComment && <textarea placeholder="Add a public comment..." value={this.state.comment} onChange={e => this.commentChange(e)}></textarea>}
            {showComment && <div>
              <button className="btn-cancel" onClick={e => this.cancelComment()}>Cancel</button>
              <button className="btn-main" type="submit" onClick={e => this.submitComment()}>Publish</button>
            </div>}
          </div> */}

          {/* {item.comments && Object.keys(item.comments).map((id) => {
            return <div className="comment" key={id}>
              <div className="title-row">
                {item.comments[id].user === loginState.user && <div className="del-comment" onClick={e => this.props.delCommentDispatch(id)}></div>}
                <div>
                  <h2>{item.comments[id].title}</h2>
                  <h4>{item.comments[id].time} by {item.comments[id].user}</h4>
                </div>
              </div>
              <span>{item.comments[id].txt}</span>
            </div>
          })} */}
        </React.Fragment>
      );
    }
    return null;
  }
}

const mapStateToProps = store => ({
  loginState: store.loginReducer,
  dataState: store.dataReducer,
});

const mapDispatchToProps = dispatch => ({
  watchLaterDispatch: id => dispatch(watchLaterAct(id)),
  recommDispatch: (vid, friendEmail) => dispatch(recommAct(vid, friendEmail)),
  // commentDispatch: (values) => dispatch(commentAct(values)),
  // delCommentDispatch: (id) => dispatch(delCommentAct(id)),
  editDetailsDispatch: (status, newRec) => dispatch(toggleEditDetailsAct(status, newRec)),
  loadDetailsDispatch: (key, list) => dispatch(loadDetailsAct(key, list, true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
