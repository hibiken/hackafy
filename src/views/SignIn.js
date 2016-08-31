import React from 'react';
import SignInForm from '../containers/SignInForm';

const SignIn = (props) => (
  <div className="sign-in__root container">
    <div className="row">
      <div className="six columns offset-by-three">
        <SignInForm />
      </div>
    </div>
  </div>
);

export default SignIn;
