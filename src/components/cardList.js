import '../styles/components/cardList.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pages from '../components/pages';
import reel from '../images/details/reel.png';
import { resetPages } from '../util/utils';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    resetPages();
  }

  render() {
    const { dataRef: buffer } = this.props;
    const tglPages = this.props.uiState;

    return (
      <div className="card-list">
        {Object.keys(buffer).map((key) => {
          const card = (
            <div className="card" key={key}>
              <Link to={`/main/details/${key}`} className="pulsing-load">
                <h4>{buffer[key].year}</h4>
                {buffer[key].poster && buffer[key].poster !== 'N/A'
                  ? <img alt="Poster" src={buffer[key].poster} /> : <img alt="Poster not available" src={reel} />
                }
              </Link>
              <h2>{buffer[key].eng_title}</h2>
            </div>
          );
          return card;
        })}
        <div className={tglPages ? 'pages-holder fade-in' : 'pages-holder'}>
          {tglPages && this.props.usePages && buffer && Object.keys(buffer).length && <Pages />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  uiState: store.uiReducer,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
