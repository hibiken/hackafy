import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { uploadPost } from '../actions';
import FilterButton from  '../components/FilterButton';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import Slider from 'material-ui/Slider';
import { filters, filterStyles, getFilterStyle } from '../config/filters';
import { getIsUploadingPost } from '../store/rootReducer';

import '../styles/NewPostBoard.css';

class NewPostBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      filter: '',
      caption: '',
      address: 'San Francisco, CA',
      filterStyle: {
        brightness: 1.0,
        contrast: 1.0,
        saturate: 1.0,
      },
    }

    this.onDrop = this._onDrop.bind(this);
    this.onCaptionChange = (e) => this.setState({ caption: e.target.value });
    this.onAddressChange = (address) => this.setState({ address });
    this.onSubmit = this._onSubmit.bind(this);
    this.onSaturationChange = this._onSaturationChange.bind(this);
    this.onContrastChange = this._onContrastChange.bind(this);
    this.onBrightnessChange = this._onBrightnessChange.bind(this);
  }

  _onDrop(files) {
    this.setState({ files });
  }

  _onSubmit(e) {
    e.preventDefault();
    if (this.state.files.length === 0) {
      return false;
    }
    const { caption, filter, files, address, filterStyle } = this.state;

    if (address) {
      geocodeByAddress(address, (err, { lat, lng }, placeId) => {
        if (err) {
          return false;
          // TODO: error message
        }
        console.log('geocode success', lat, lng, placeId);
        this.props.uploadPost({ caption, filter, address, lat, lng, placeId, filterStyle }, files[0]);
      });
    } else {
      this.props.uploadPost({ caption, filter, filterStyle }, files[0]);
    }
  }

  _onSaturationChange(event, value) {
    this.setState({
      filterStyle: {
        ...this.state.filterStyle,
        saturate: value,
      }
    });
  }

  _onContrastChange(event, value) {
    this.setState({
      filterStyle: {
        ...this.state.filterStyle,
        contrast: value,
      }
    });
  }

  _onBrightnessChange(event, value) {
    this.setState({
      filterStyle: {
        ...this.state.filterStyle,
        brightness: value,
      }
    });
  }

  renderDropzone() {
    if (this.state.files.length > 0) {
      const preview = this.state.files[0].preview;
      return (
        <Dropzone
          className="NewPostBoard__dropzone"
          multiple={false}
          accept="image/*"
          onDrop={this.onDrop}>
          <figure
            className={`NewPostBoard__preview-filter ${this.state.filter}`}
            style={getFilterStyle(this.state.filterStyle)}>
            <div
              className="NewPostBoard__preview-img"
              style={{backgroundImage: `url(${preview})`}}>
            </div>
          </figure>
        </Dropzone>
      )
    } else {
      return (
        <Dropzone
          className="NewPostBoard__dropzone"
          onDrop={this.onDrop}
          multiple={false}
          accept="image/*">
          <div>Drop file here!</div>
        </Dropzone>
      )
    }
  }

  renderFilterOptions() {
    if (this.state.files.length > 0) {
      const preview = this.state.files[0].preview;
      return (
        <div className="NewPostBoard__filters">
          {filters.map((f, idx) => (
            <FilterButton
              key={idx}
              active={this.state.filter === f.className}
              onMouseDown={() => this.setState({ filter: f.className, filterStyle: filterStyles[f.className] })}
              imagePath={preview}
              filter={f.className}
              >
              {f.label}
            </FilterButton>
          ))}
        </div>
      )
    }
  }

  renderCaptionField() {
    if (this.state.files.length > 0) {
      return (
        <div>
          <div>
            <textarea
              value={this.state.caption}
              onChange={this.onCaptionChange}
              placeholder="Caption(optional)"
            />
          </div>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.onAddressChange}
          />
          <button onClick={this.onSubmit} disabled={this.props.isUploading}>
            {this.props.isUploading === true
            ? (<i className="fa fa-spinner fa-pulse fa-3x fa-fw NewPostBoard__spinner"/>) 
            : 'Submit'}
          </button>
        </div>
      )
    }
  }

  render() {
    console.log('this.state', this.state)
    console.log('this.props', this.props);
    return (
      <div className="NewPostBoard__root">
        <div className="row">
          <div className="six columns">
            <div className="NewPostBoard__dropzone-wrapper">
              {this.renderDropzone()}
            </div>
          </div>
          <div className="six columns">
            <div className="NewPostBoard__slider-wrapper">
              <div className="NewPostBoard__slider-item">
                <label className="NewPostBoard__slider-label">
                  <i className="fa fa-sun-o NewPostBoard__slider-icon" aria-hidden="true"/> Brightness
                </label>
                <Slider
                  defaultValue={1.0}
                  value={this.state.filterStyle.brightness}
                  onChange={this.onBrightnessChange}
                  min={0.20}
                  max={2.00}
                  step={0.01}
                  disabled={this.state.files.length === 0}
                />
              </div>

              <div className="NewPostBoard__slider-item">
                <label className="NewPostBoard__slider-label">
                  <i className="fa fa-adjust NewPostBoard__slider-icon" aria-hidden="true"/> Contrast
                </label>
                <Slider
                  defaultValue={1.0}
                  value={this.state.filterStyle.contrast}
                  onChange={this.onContrastChange}
                  min={0.20}
                  max={2.00}
                  step={0.01}
                  disabled={this.state.files.length === 0}
                />
              </div>

              <div className="NewPostBoard__slider-item">
                <label className="NewPostBoard__slider-label">
                  <i className="fa fa-tint NewPostBoard__slider-icon" aria-hidden="true" /> Saturation
                </label>
                <Slider
                  defaultValue={1.0}
                  value={this.state.filterStyle.saturate}
                  onChange={this.onSaturationChange}
                  min={0.00}
                  max={3.00}
                  step={0.01}
                  disabled={this.state.files.length === 0}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="twelve columns">
            {this.renderFilterOptions()}
          </div>
          <div>
            {this.renderCaptionField()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isUploading: getIsUploadingPost(state),
})

export default connect(
  mapStateToProps,
  { uploadPost }
)(NewPostBoard);
