import React from 'react';
import { reduxForm } from 'redux-form';
import { userSignIn } from '../actions';
import { getAuthErrors, getIsAuthenticating } from '../store/rootReducer';
import ErrorMessages from '../components/ErrorMessages';
import '../styles/SignInForm.css';

class SignInForm extends React.Component {

  renderError(field) {
    if (field.touched && field.error) {
      return (
        <span className="SignInForm__error-text">
          {field.error}
        </span>
      );
    }
  }

  render() {
    const {
        fields: { email, password },
        handleSubmit,
        userSignIn,
        isAuthenticating
      } = this.props;
    return (
      <form className="SignInForm__root" onSubmit={handleSubmit(userSignIn)}>
        <fieldset>
          <input
            type="text"
            placeholder="Email"
            className="SignInForm__input"
            {...email}
          />
          {this.renderError(email)}
        </fieldset>
        <fieldset>
          <input
            type="password"
            placeholder="Password"
            className="SignInForm__input"
            {...password}
          />
          {this.renderError(password)}
        </fieldset>
        <button
          className="SignInForm__button"
          disabled={this.props.invalid || isAuthenticating}
          type="submit">
          {isAuthenticating ?
          <i className="fa fa-spinner fa-pulse fa-3x fa-fw SignInForm__spinner" /> :
          'Log In'}
        </button>
        <ErrorMessages messages={this.props.errorMessages} />
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
}

const mapStateToProps = (state) => ({
  errorMessages: getAuthErrors(state),
  isAuthenticating: getIsAuthenticating(state),
});

export default reduxForm({
  form: 'SignIn',
  fields: ['email', 'password'],
  validate,
}, mapStateToProps, { userSignIn })(SignInForm);
