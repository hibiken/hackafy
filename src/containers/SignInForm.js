import React from 'react';
import { reduxForm } from 'redux-form';
import { userSignIn } from '../actions';

class SignInForm extends React.Component {
  render() {
    const { fields: { email, password }, handleSubmit, userSignIn } = this.props;
    return (
      <form onSubmit={handleSubmit(userSignIn)}>
        <fieldset>
          <label>Email</label>
          <input
            type="text"
            placeholder="Email or Username"
            {...email}
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            {...password}
          />
        </fieldset>
        <button type="submit">
          Sign In
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'SignIn',
  fields: ['email', 'password'],
}, null, { userSignIn })(SignInForm);
