import React from 'react';
import ProfileEditForm from '../containers/ProfileEditForm';
import NotificationCardsContainer from '../containers/NotificationCardsContainer';

import '../styles/ProfileEdit.css';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div className="ProfileEdit__root container">
        <div className="row ProfileEdit__form-container">
          <div className="six columns offset-by-three">
            <ProfileEditForm />
          </div>
        </div>
        <NotificationCardsContainer />
      </div>
    );
  }
}

export default ProfileEdit;
