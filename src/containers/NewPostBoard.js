import React from 'react';
import Dropzone from 'react-dropzone';

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
    }

    this.onDrop = this._onDrop.bind(this);
  }

  _onDrop(files) {
    this.setState({ files });
  }

  renderDropzone() {
    if (this.state.files.length > 0) {
      const preview = this.state.files[0].preview;
      return (
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this.onDrop}>
          <figure className={`NewPostBoard__filter ${this.state.filter}`}>
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
      return (
        <div className="NewPostBoard__filters">
          {filters.map(f => (
            <button
              onMouseDown={() => this.setState({ filter: f.className })}
              >
              {f.label}
            </button>
          ))}
        </div>
      )
    }
  }

  render() {
    console.log('this.state', this.state)
    return (
      <div className="NewPostBoard__root">
        {this.renderDropzone()}

        {this.renderFilterOptions()}
      </div>
    )
  }
}

export default NewPostBoard
