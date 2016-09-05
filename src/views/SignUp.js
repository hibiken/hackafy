import React from 'react';
import SignUpForm from '../containers/SignUpForm';
import FacebookLoginButton from '../containers/FacebookLoginButton';
import FormDivider from '../components/FormDivider';
import '../styles/SignUp.css';

const SignUp = (props) => {
  return (
    <div className="SignUp__root container">
      <div className="row">
        <div className="six columns offset-by-three">
          <div className="SignUp__form-wrapper">
            <SignUpForm />
            <FormDivider />
            <FacebookLoginButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
