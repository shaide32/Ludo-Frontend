import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '386851791646-oiaar3v69kin8s10iuva8uouvjj5b3c7.apps.googleusercontent.com';

function Logout(props) {
  const onSuccess = () => {
    console.log('Logout made successfully');
    props.updateUser(null);
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText={`Logout ${props.user}`}
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;