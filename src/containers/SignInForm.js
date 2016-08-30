import React from 'react';
import { reduxForm } from 'redux-form';
import { userSignIn } from '../actions';
import { getAuthErrors } from '../store/rootReducer';

class SignInForm extends React.Component {
  // TODO: make this into a separate component.
  renderErrorMessage() {
    if (this.props.errorMessages.length) {
      return (
        <div className="ErrorMessages__root">
          {this.props.errorMessages.map((msg, idx) => (
            <div key={idx}>
              {msg}
            </div>
          ))}
        </div>
      );
    }
  }

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
        {this.renderErrorMessage()}
        <button type="submit">
          Sign In
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  errorMessages: getAuthErrors(state),
});

export default reduxForm({
  form: 'SignIn',
  fields: ['email', 'password'],
}, mapStateToProps, { userSignIn })(SignInForm);
