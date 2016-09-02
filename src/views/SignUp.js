import React from 'react';
import SignUpForm from '../containers/SignUpForm';
import FacebookLoginButton from '../containers/FacebookLoginButton';

const SignUp = (props) => {
  return (
    <div className="SignUp__root container">
      <div className="row">
        <div className="six columns offset-by-three">
          <SignUpForm />
          <FacebookLoginButton />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
