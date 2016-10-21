import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';

const propTypes = {
  onDrop: PropTypes.func.isRequired,
}

const PictureDropzone = (props) => {
  return (
    <Dropzone
      className="NewPostBoard__dropzone"
      onDrop={props.onDrop}
      multiple={false}
      accept="image/*">
      <div className="NewPostBoard__dropzone-inner-wrapper">
        <div className="NewPostBoard__dropzone-inner-content">
          <div>
            <i className="fa fa-camera NewPostBoard__dropzone-icon" aria-hidden="true" />
          </div>
          <div className="NewPostBoard__dropzone-text">Upload Picture</div>
        </div>
      </div>
    </Dropzone>
  );
}

PictureDropzone.propTypes = propTypes;

export default PictureDropzone;
