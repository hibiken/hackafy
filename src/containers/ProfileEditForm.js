import React from 'react';
import { reduxForm } from 'redux-form';
import { getCurrentUser } from '../store/rootReducer';


class ProfileEditForm extends React.Component {
  render() {
    const { fields: { username }, handleSubmit } = this.props;
    return (
      <form className="ProfileEditForm__root" onSubmit={handleSubmit}>
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
    }
  }
}

export default reduxForm({
  form: 'ProfileEdit',
  fields: ['username']
}, mapStateToProps)(ProfileEditForm);
