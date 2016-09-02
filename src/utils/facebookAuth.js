export const statusChangeCallback = (response, successCallback) => {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    successCallback();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    console.log('Please log into this app');
    window.FB.login(successCallback);
  } else {
    console.log('Please log into Facebook');
    window.FB.login(successCallback);
  }
}


export const checkLoginState = () => {
  window.FB.getLoginStatus(response => {
    statusChangeCallback(response);
  });
};
