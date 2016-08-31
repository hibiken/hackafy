import React from 'react';
import SignUpForm from '../containers/SignUpForm';

const SignUp = (props) => {
  return (
    <div className="SignUp__root container">
      <div className="row">
        <div className="six columns offset-by-three">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
