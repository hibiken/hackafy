import React from 'react';
import Dropzone from 'react-dropzone';

import '../styles/NewPostBoard.css';

class NewPostBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
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
          <div
            className="NewPostBoard__preview-img"
            style={{backgroundImage: `url(${preview})`}}>
          </div>
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
        <div>
          Disply filter options here!!!
        </div>
      )
    }
  }

  render() {
    return (
      <div className="NewPostBoard__root">
        {this.renderDropzone()}

        {this.renderFilterOptions()}
      </div>
    )
  }
}

export default NewPostBoard
