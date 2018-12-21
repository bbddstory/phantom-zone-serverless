import '../styles/components/editDetails.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import { toggleEditDetailsAct } from '../actions/uiActions';
import { saveDetailsAct } from '../actions/detailsActions';
import { CATS, REGEX } from '../util/utils';
import { Formik, Form } from 'formik';
import Mousetrap from 'mousetrap';

class EditDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { details: this.props.dataState.details.main };
    // this.setState({details: Object.assign({}, this.props.dataState.details.main)})
  }

  componentDidMount() {
    Mousetrap.bind('esc', e => this.props.editDetailsDispatch(false, false));
  }

  componentWillUnmount() {
    Mousetrap.unbind('esc', e => this.props.editDetailsDispatch(false, false));
  }

  render() {
    // Detect whether this is modifying an existing record or adding a new one
    let item;

    if (this.props.uiState.newRec) { // New record
      item = {}
    } else { // Existing record
      item = this.state.details
    }
    console.log(item);

    return (
      <Formik
        initialValues={item}
        validate={(values) => {
          const errors = {};
          for (let p in values) {
            if (values[p] && !new RegExp(REGEX[p]).test(values[p])) {
              errors[p] = 1; // or set to 'true'
            }
            if (values[p] === null) {
              values[p] = ''
            }
          }
          return errors;
        }}
        onSubmit={(values) => {
          values.plot = values.plot.replace(/'/g, "\\'");
          values.plot = values.plot.replace(/"/g, '\\"');
          for(let p in values) {
            values[p] = values[p].trim()
          }
          this.props.saveDetailsDispatch(values);
          this.props.editDetailsDispatch(false, false);
        }}
        render = {
          ({touched, errors, values, handleChange, handleBlur, handleSubmit}) => (
            <Form onSubmit={handleSubmit}>
              <div className="popup-bg">
                <div className="popup-panel">
                    <div className="panel-body">

                      <div className="flex">
                        <div className="input-padding width-50">
                          <label>English Title</label>
                          <input type="text" name="eng_title" width="200" value={values.eng_title || ''} autoFocus onChange={handleChange} onBlur={handleBlur} />
                          {touched.eng_title && errors.eng_title && <span style={{color: 'red', marginTop: '0'}}>Contains invalid characters</span>}
                        </div>
                        <div className="input-padding width-50">
                          <label>Original Title</label>
                          <input type="text" name="orig_title" width="200" value={values.orig_title || ''} onChange={handleChange} onBlur={handleBlur} />
                          {touched.orig_title && errors.orig_title && <span style={{color: 'red', marginTop: '0'}}>Contains invalid characters</span>}
                        </div>
                      </div>

                      <div className="flex">
                        <div className="input-padding flex width-50">
                          <div className="width-50" style={{ padding: '0 10px 0 0' }}>
                            <label>Year</label>
                            <input type="text" name="year" width="4" value={values.year || ''} onChange={handleChange} onBlur={handleBlur} />
                            {touched.year && errors.year && <span style={{color: 'red', marginTop: '0'}}>Must be between 1900 and 2099</span>}
                          </div>
                          <div className="width-50" style={{ padding: '0 0 0 10px' }}>
                            <label>Runtime</label>
                            <input type="text" name="runtime" width="10" placeholder="1h 30min" value={values.runtime || ''} onChange={handleChange} onBlur={handleBlur} />
                            {touched.runtime && errors.runtime && <span style={{color: 'red', marginTop: '0'}}>Format incorrect</span>}
                          </div>
                        </div>

                        <div className="input-padding width-50">
                          <label>Stars</label>
                          <input type="text" name="stars" width="200" value={values.stars || ''} onChange={handleChange} />
                          {touched.stars && errors.stars && <span style={{color: 'red', marginTop: '0'}}>One or more names separated by comma</span>}
                        </div>
                      </div>

                      <div className="flex">
                        <div className="input-padding width-50">
                          <label>Directors</label>
                          <input type="text" name="director" value={values.director || ''} onChange={handleChange} onBlur={handleBlur} />
                          {touched.director && errors.director && <span style={{color: 'red', marginTop: '0'}}>One or more names separated by comma</span>}
                        </div>
                        <div className="input-padding width-50">
                          <label>Creators</label>
                          <input type="text" name="creator" value={values.creator || ''} onChange={handleChange} onBlur={handleBlur} />
                          {touched.creator && errors.creator && <span style={{color: 'red', marginTop: '0'}}>One or more names separated by comma</span>}
                        </div>
                      </div>

                      <div className="input-padding">
                        <label className="textarea-lbl">Plot</label>
                        <textarea name="plot" value={values.plot || ''} onChange={handleChange} onBlur={handleBlur} />
                        {touched.plot && errors.plot && <span style={{color: 'red', marginTop: '0'}}>Contains invalid characters</span>}
                      </div>

                      <div className="flex">
                        <div className="input-padding width-25">
                          <label>IMDB ID</label>
                          <input type="text" name="imdb" placeholder="tt1234567" value={values.imdb || ''} onChange={handleChange} onBlur={handleBlur} />
                          {touched.imdb && errors.imdb && <span style={{color: 'red', marginTop: '0'}}>Format incorrect</span>}
                        </div>
                        <div className="input-padding width-25">
                          <label>Rating</label>
                          <input type="text" name="rating" placeholder="9.9" value={values.rating || ''} onChange={handleChange} onBlur={handleBlur} />
                          {touched.rating && errors.rating && <span style={{color: 'red', marginTop: '0'}}>Format incorrect</span>}
                        </div>
                        <div className="input-padding width-25">
                          <label>Douban</label>
                          <input type="text" name="douban" value={values.douban || ''} onChange={handleChange} onBlur={handleBlur} />
                          {touched.douban && errors.douban && <span style={{color: 'red', marginTop: '0'}}>Format incorrect</span>}
                        </div>
                        <div className="input-padding width-25">
                          <label>Mtime</label>
                          <input type="text" name="mtime" value={values.mtime || ''} onChange={handleChange} onBlur={handleBlur} />
                          {touched.mtime && errors.mtime && <span style={{color: 'red', marginTop: '0'}}>Format incorrect</span>}
                        </div>
                      </div>

                      <div className="flex">
                        <div className="input-padding width-25">
                          <label>Trailer</label>
                          <input type="text" name="trailer" value={values.trailer || ''} onChange={handleChange} onBlur={handleBlur} />
                          {touched.trailer && errors.trailer && <span style={{color: 'red', marginTop: '0'}}>Format incorrect</span>}
                        </div>
                        <div className="input-padding width-25">
                          <label>Featurette</label>
                          <input type="text" name="featurette" value={values.featurette || ''} onChange={handleChange} onBlur={handleBlur} />
                          {touched.featurette && errors.featurette && <span style={{color: 'red', marginTop: '0'}}>Format incorrect</span>}
                        </div>
                        <div className="input-padding width-25">
                          <label>Status</label>
                          <select name="status" value={values.status || 0} onChange={handleChange} onBlur={handleBlur}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                          </select>
                        </div>
                        <div className="input-padding width-25">
                          <label>Category</label>
                          <select name="category" value={values.category} onChange={handleChange} onBlur={handleBlur}>
                            <option value={CATS.movie}>Movies</option>
                            <option value={CATS.tv}>TV</option>
                            <option value={CATS.doc}>Documentaries</option>
                            <option value={CATS.anime}>Animations</option>
                          </select>
                        </div>
                      </div>

                      <div className="input-padding">
                        <label>Poster</label>
                        <textarea name="poster" className="poster" value={values.poster || ''} onChange={handleChange} onBlur={handleBlur} />
                        {touched.poster && errors.poster && <span style={{color: 'red', marginTop: '0'}}>Not a valid URL</span>}
                      </div>

                      <div className="input-padding">
                        <label>Subtitle</label>
                        <input type="text" name="subtitle" value={values.subtitle || ''} onChange={handleChange} onBlur={handleBlur} />
                        {touched.subtitle && errors.subtitle && <span style={{color: 'red', marginTop: '0'}}>Not a valid URL</span>}
                      </div>

                    </div>
                    <div className="panel-footer">
                      <button className="btn-cancel" onClick={e => this.props.editDetailsDispatch(false, false)}>Cancel</button>
                      <button className="btn-main" type="submit">Save</button>
                    </div>
                </div>
              </div>
            </Form>
          )}
      />
    );
  }
}

const mapStateToProps = (store) => ({
  dataState: store.dataReducer,
  uiState: store.uiReducer
});

const mapDispatchToProps = (dispatch) => ({
  editDetailsDispatch: (status, newRec) => dispatch(toggleEditDetailsAct(status, newRec)),
  saveDetailsDispatch: (values) => dispatch(saveDetailsAct(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDetails);
