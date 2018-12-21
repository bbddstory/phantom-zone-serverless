import '../styles/components/tileList.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pages from '../components/pages';
import reel from '../images/details/reel.png';
import { resetPages } from '../util/utils';

class TileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    resetPages();
  }

  render() {
    const { props } = this;
    const { dataRef: buffer } = props;
    const { uiState } = props;
    const { tglPages } = uiState;

    return (
      <div className="tile-list">
        {Object.keys(buffer).map(key => (
          <div className="tile" key={key}>
            <div className="tile-wrap">
              <Link to={`/main/details/${key}`} className="pulsing-load">
                {buffer[key].poster && buffer[key].poster !== 'N/A'
                  ? <img alt="Poster" src={buffer[key].poster} /> : <img alt="Poster not available" src={reel} />
                }
              </Link>
              <div className="info">
                <h2 className="title">{buffer[key].eng_title}<br /><span className="director">Director Names</span></h2>
                <h4 className="year">{buffer[key].year}</h4>
              </div>
            </div>
          </div>
        ))}
        <div className={tglPages ? 'pages-holder fade-in' : 'pages-holder'} style={{ marginTop: '30px' }}>
          {tglPages && props.usePages && buffer && Object.keys(buffer).length && <Pages />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  uiState: store.uiReducer,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(TileList);
