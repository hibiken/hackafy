import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { uploadPost } from '../actions';
import FilterButton from  '../components/FilterButton';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

import '../styles/NewPostBoard.css';

const filters = [
  {label: '1977', className: '_1977' },
  {label: 'ADEN', className: 'aden'},
  {label: 'Brooklyn', className: 'brooklyn'},
  {label: 'Clarendon', className: 'clarendon'},
  {label: 'earlybird', className: 'earlybird'},
  {label: 'Gingham', className: 'gingham'},
  {label: 'Hudson', className: 'hudson'},
  {label: 'Inkwell', className: 'inkwell'},
  {label: 'lark', className: 'lark'},
  {label: 'Lo-Fi', className: 'lofi'},
  {label: 'Mayfair', className: 'mayfair'},
  {label: 'Moon', className: 'moon'},
  {label: 'Nashville', className: 'nashville'},
  {label: 'Perpetua', className: 'perpetua'},
  {label: 'Reyes', className: 'reyes'},
  {label: 'Rise', className: 'rise'},
  {label: 'Slumber', className: 'slumber'},
  {label: 'Toaster', className: 'toaster'},
  {label: 'Walden', className: 'walden'},
  {label: 'Willow', className: 'willow'},
  {label: 'X-pro II', className: 'xpro2'},
];

class NewPostBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      filter: '',
      caption: '',
      address: 'San Francisco, CA',
    }

    this.onDrop = this._onDrop.bind(this);
    this.onCaptionChange = (e) => this.setState({ caption: e.target.value });
    this.onAddressChange = (address) => this.setState({ address });
    this.onSubmit = this._onSubmit.bind(this);
  }

  _onDrop(files) {
    this.setState({ files });
  }

  _onSubmit(e) {
    e.preventDefault();
    if (this.state.files.length === 0) {
      return false;
    }
    const { caption, filter, files, address } = this.state;

    geocodeByAddress(address, (err, { lat, lng }) => {
      if (err) {
        return false;
        // TODO: error message
      }
      console.log('geocode success', lat, lng);
      this.props.uploadPost({ caption, filter, address, lat, lng }, files[0]);
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
          <figure className={`NewPostBoard__preview-filter ${this.state.filter}`}>
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
              onMouseDown={() => this.setState({ filter: f.className })}
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
          <button onClick={this.onSubmit}>
            Share
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
        <div className="NewPostBoard__dropzone-wrapper">
          {this.renderDropzone()}
        </div>

        {this.renderFilterOptions()}

        {this.renderCaptionField()}
      </div>
    )
  }
}

export default connect(
  null,
  { uploadPost }
)(NewPostBoard);
