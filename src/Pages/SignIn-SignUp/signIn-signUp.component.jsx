import React from 'react';
import SignIn from '../../Components/Sign-In/sign-in.component';
import SignUp from '../../Components/Sign-Up/sign-up.component';
import './signIn-signUp.styles.scss';

const SignInSignUp = () => (
    <div className='sign-in-and-sign-up'>
        <SignIn />
        <SignUp />
    </div>
);

export default SignInSignUp;