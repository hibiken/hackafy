import React from 'react';
import { reduxForm } from 'redux-form';
import { userSignUp } from '../actions';
import { getAuthErrors } from '../store/rootReducer';

class SignUpForm extends React.Component {
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
        {this.renderErrorMessage()}
        <button type="submit">
          Sign Up
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  errorMessages: getAuthErrors(state),
});

export default reduxForm({
  form: 'SignUp',
  fields: ['email', 'username', 'password']
}, mapStateToProps, { userSignUp })(SignUpForm);
