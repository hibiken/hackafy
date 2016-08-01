import React from 'react';
import { reduxForm } from 'redux-form';
import { getCurrentUser } from '../store/rootReducer';
import { userUpdate } from '../actions';


class ProfileEditForm extends React.Component {
  render() {
    const { fields: { username }, handleSubmit, userUpdate } = this.props;
    return (
      <form className="ProfileEditForm__root" onSubmit={handleSubmit(userUpdate)}>
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

const mapDispatchToProps = (dispatch) => ({
  userUpdate({username}) {
    dispatch(userUpdate({username}))
  },
});

export default reduxForm({
  form: 'ProfileEdit',
  fields: ['username']
}, mapStateToProps, mapDispatchToProps)(ProfileEditForm);
