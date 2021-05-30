import React from 'react';

import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../../utils/refreshTokenSetup';
import './Login.css';

const clientId = '386851791646-ukmedfre69hp581avi6ma7umugd7kekg.apps.googleusercontent.com';

function Login(props) {
    const { user, updateUser } = props;
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    updateUser(res.profileObj.name);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  return (
    <div className="login-wrapper">
      <h2>Login to play Ludo</h2>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;