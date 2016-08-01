import React from 'react';
import { reduxForm } from 'redux-form';
import { userSignUp } from '../actions/actionCreators';

class SignUpForm extends React.Component {
  render() {
    const { fields: { email, username, password }, handleSubmit, userSignUp } = this.props;
    return (
      <form onSubmit={handleSubmit(userSignUp)}>
        <fieldset>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            {...email}
          />
        </fieldset>
        <fieldset>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            {...username}
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <input
            type="password"
            placeholder="Create Password"
            {...password}
          />
        </fieldset>
        <button type="submit">
          Sign Up
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'SignUp',
  fields: ['email', 'username', 'password']
}, null, { userSignUp })(SignUpForm);
