import React from 'react';
import { connect } from 'react-redux';
import { uploadPost } from '../actions';
import PictureDropzone from '../components/PictureDropzone';
import FilterButton from  '../components/FilterButton';
import TabButton from '../components/TabButton';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import Slider from 'material-ui/Slider';
import { filters, filterStyles, getFilterStyle } from '../config/filters';
import { getIsUploadingPost, getCurrentUser } from '../store/rootReducer';
import { getAvatarUrl } from '../utils/helpers';

import '../styles/NewPostBoard.css';

class NewPostBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      step: 0,
      selectedTab: 'edit',
      filter: '',
      caption: '',
      address: '',
      filterStyle: {
        brightness: 1.0,
        contrast: 1.0,
        saturate: 1.0,
      },
    }

    this.onCaptionChange = (e) => this.setState({ caption: e.target.value });
    this.onAddressChange = (address) => this.setState({ address });
  }

  onDrop = (files) => {
    this.setState({
      files,
      step: 1
    });
  }

  _setTab(tabType) {
    this.setState({selectedTab: tabType})
  }

  onNextClick = () => {
    this.setState({step: this.state.step + 1})
  }

  onBackToStepZero = () => {
    // Reset to initialState
    this.setState({
      files: [],
      step: 0,
      selectedTab: 'edit',
      filter: '',
      caption: '',
      address: '',
      filterStyle: {
        brightness: 1.0,
        contrast: 1.0,
        saturate: 1.0,
      }
    })
  }

  onBackToStepOne = () => {
    this.setState({ step: 1 })
  }

  onSubmit = (e) => {
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
        this.props.uploadPost({ caption, filter, address, lat, lng, placeId, filterStyle }, files[0])
          .then(() => this.props.afterSubmit())
      });
    } else {
      this.props.uploadPost({ caption, filter, filterStyle }, files[0])
        .then(() => this.props.afterSubmit())
    }
  }

  onSaturationChange = (event, value) => {
    this.setState({
      filterStyle: {
        ...this.state.filterStyle,
        saturate: value,
      }
    });
  }

  onContrastChange = (event, value) => {
    this.setState({
      filterStyle: {
        ...this.state.filterStyle,
        contrast: value,
      }
    });
  }

  onBrightnessChange = (event, value) => {
    this.setState({
      filterStyle: {
        ...this.state.filterStyle,
        brightness: value,
      }
    });
  }

  renderTabPanel() {
    if (this.state.selectedTab === 'filter') {
      return (
        <div className="NewPostBoard__tab-panel">
          {this.renderFilterOptions()}
        </div>
      );
    } else if (this.state.selectedTab === 'edit') {
      return (
        <div className="NewPostBoard__tab-panel">
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
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.onAddressChange}
            classNames={{
              input: 'NewPostBoard__address-input',
              autocompleteContainer: 'NewPostBoard__place-autocomplete-container',
            }}
          />
          <div>
            <label>Caption</label>
            <textarea
              value={this.state.caption}
              onChange={this.onCaptionChange}
              placeholder="Caption(optional)"
              className="NewPostBoard__caption-box"
              style={{resize: 'none'}}
            />
          </div>
        </div>
      )
    }
  }

  render() {
    switch (this.state.step) {
      case 0:
        return (
          <div className="NewPostBoard__root">
            <div className="row">
              <div className="twelve columns">
                <div className="NewPostBoard__dropzone-wrapper">
                  <PictureDropzone onDrop={this.onDrop} />
                </div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="NewPostBoard__root">
            <div className="row">
              <div className="twelve columns">
                <div className="NewPostBoard__dropzone-row">
                  <div>
                    <button
                      onClick={this.onBackToStepZero}
                      className="NewPostBoard__back-button"><i className="fa fa-arrow-left"/> Back</button>
                  </div>
                  <div className="NewPostBoard__dropzone-wrapper">
                    <div className="NewPostBoard__edit-preview">
                      <figure
                        className={`NewPostBoard__preview-filter ${this.state.filter}`}
                        style={getFilterStyle(this.state.filterStyle)}>
                        <div
                          className="NewPostBoard__preview-img"
                          style={{backgroundImage: `url(${this.state.files[0].preview})`}}>
                        </div>
                      </figure>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={this.onNextClick}
                      className="NewPostBoard__next-button">Next <i className="fa fa-arrow-right"/></button>
                  </div>
                </div>
              </div>
              <div className="twelve columns">
                <div className="NewPostBoard__tabs">
                  <TabButton
                   className="NewPostBoard__tab"
                   onClick={() =>this._setTab('filter')}
                   active={this.state.selectedTab === 'filter'}>
                    Filter
                  </TabButton>
                  <TabButton
                   className="NewPostBoard__tab"
                   onClick={() =>this._setTab('edit')}
                   active={this.state.selectedTab === 'edit'}>
                    Edit
                  </TabButton>
                </div>
                {this.renderTabPanel()}
              </div>
            </div>
          </div>
        );
      case 2:
        const { avatarUrl, username } = this.props.currentUser;
        const preview = this.state.files[0].preview;
        return (
          <div className="NewPostBoard__root">
            <div className="row">
              <div className="twelve columns">
                <div className="NewPostBoard__dropzone-row">
                  <div>
                    <button
                      onClick={this.onBackToStepOne}
                      className="NewPostBoard__back-button">
                      <i className="fa fa-arrow-left"/> Back
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={this.onSubmit}
                      disabled={this.props.isUploading}
                      className="NewPostBoard__share-button">
                      {this.props.isUploading === true
                      ? (<i className="fa fa-spinner fa-pulse fa-3x fa-fw NewPostBoard__spinner"/>)
                      : 'Share'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="row NewPostBoard__step-two-main-container">
                <div className="six columns">
                  <h2 className="NewPostBoard__preview-text">Preview</h2>
                  <div className="NewPostBoard__preview-card">
                    <div className="NewPostBoard__preview-card-header">
                      <div className="NewPostBoard__preview-card-avatar-container">
                        <img
                          src={getAvatarUrl(avatarUrl)}
                          className="NewPostBoard__preview-card-avatar-img"
                          alt={`${username} profile`}
                        />
                      </div>
                      <div className="GalleryItem-header__metadata-container">
                        <div className="GalleryItem-header__username">
                          <span>{username}</span>
                        </div>
                        {this.state.address.trim().length > 0
                         ? (<div><span>{this.state.address}</span></div>)
                         : null}
                      </div>
                    </div>
                    <div className="NewPostBoard__dropzone-wrapper">
                      <div
                       className={`GalleryItem__body ${this.state.filter || ''}`}
                       style={getFilterStyle(this.state.filterStyle)}>
                        <img src={preview} role="presentation" />
                      </div>
                    </div>
                    {this.state.caption.trim().length > 0
                     ? (
                      <div className="NewPostBoard__preview-card-footer">
                       <strong>{username}</strong> {this.state.caption}
                     </div>
                    ) : null }
                  </div>
                </div>
                <div className="six columns NewPostBoard__caption-location-container">
                  {this.renderCaptionField()}
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null;
    }
  }
}

const mapStateToProps = (state) => ({
  isUploading: getIsUploadingPost(state),
  currentUser: getCurrentUser(state),
})

export default connect(
  mapStateToProps,
  { uploadPost }
)(NewPostBoard);
