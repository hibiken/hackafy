import React from 'react';
import SignInForm from '../containers/SignInForm';
import FacebookLoginButton from '../containers/FacebookLoginButton';

const SignIn = (props) => (
  <div className="sign-in__root container">
    <div className="row">
      <div className="six columns offset-by-three">
        <SignInForm />
        <FacebookLoginButton />
      </div>
    </div>
  </div>
);

export default SignIn;
