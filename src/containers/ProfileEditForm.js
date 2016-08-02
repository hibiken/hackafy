import React from 'react';
import { reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import { getCurrentUser } from '../store/rootReducer';
import { userUpdate } from '../actions';
import { getAvatarUrl } from '../utils/helpers';

import '../styles/ProfileEditForm.css';


class ProfileEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };

    this.onDrop = this._onDrop.bind(this);
    this.onSubmit = this._onSubmit.bind(this);
  }

  _onDrop(files) {
    this.setState({ files });
  }

  renderDropzone() {
    const { avatarUrl } = this.props.currentUser;
    if (this.state.files.length > 0) {
      const preview = this.state.files[0].preview
      return (
        <Dropzone multiple={false} accept="image/*" onDrop={this.onDrop}>
          <div
            className="ProfileEditForm__avatar-img"
            style={{backgroundImage: `url(${preview})`}}>
            <div className="ProfileEditForm__avatar-img-overlay">
              <i className="fa fa-camera ProfileEditForm__camera-icon"/>
            </div>
          </div>
        </Dropzone>
      );
    } else {
      return (
        <Dropzone multiple={false} accept="image/*" onDrop={this.onDrop}>
        <div
          className="ProfileEditForm__avatar-img"
          style={{backgroundImage: `url(${getAvatarUrl(avatarUrl)})`}}>
          <div className="ProfileEditForm__avatar-img-overlay">
            <i className="fa fa-camera ProfileEditForm__camera-icon"/>
          </div>
        </div>
        </Dropzone>
      );
    }
  }

  _onSubmit(fieldValues) {
    this.props.userUpdate(fieldValues, this.state.files[0]);
  }

  render() {
    const { fields: { username }, handleSubmit } = this.props;
    return (
      <form className="ProfileEditForm__root" onSubmit={handleSubmit(this.onSubmit)}>

        <div>
          <label>Profile Image</label>
          {this.renderDropzone()}
        </div>
        <fieldset>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            {...username}
          />
        </fieldset>
        <button type="submit">
          Submit
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const currentUser = getCurrentUser(state);
  return {
    initialValues: {
      username: currentUser.username,
    },
    currentUser,
  }
}

const mapDispatchToProps = (dispatch) => ({
  userUpdate(formData, file) {
    dispatch(userUpdate(formData, file));
  }
})

export default reduxForm({
  form: 'ProfileEdit',
  fields: ['username']
}, mapStateToProps, mapDispatchToProps)(ProfileEditForm);
