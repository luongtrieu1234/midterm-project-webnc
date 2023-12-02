// import { useEffect } from "react";
// import { useLocation, useHistory } from "react-router-dom";
// import axios from 'axios';
// import React from "react";

// const OAuthCallback = () => {
//     const location = useLocation();
//     const history = useHistory();

//     useEffect(() => {
//       const getAuthorizationCode = () => {
//         const searchParams = new URLSearchParams(location.search);
//         const code = searchParams.get('code');

//         if (code) {
//           // Send the authorization code to your backend for further processing
//           sendAuthorizationCodeToBackend(code);
//         } else {
//           // Handle the case when no authorization code is present
//           console.error('No authorization code found in the URL.');
//         }
//       };

//       const sendAuthorizationCodeToBackend = async (code) => {
//         try {
//           // Make a request to your backend to exchange the code for an access token
//           const response = await axios.post('http://localhost:5000/oauth/token', {
//             code: code,
//           });

//           // Handle the response from the backend (e.g., store the token in state or cookies)
//           console.log('Access Token:', response.data.access_token);

//           // Redirect the user to the desired page
//           history.push('/dashboard');
//         } catch (error) {
//           console.error('Error exchanging authorization code:', error);
//         }
//       };

//       // Call the function to extract and process the authorization code
//       getAuthorizationCode();
//     }, [location.search, history]);

//     return (
//       <div>
//         <p>Processing...</p>
//       </div>
//     );
//   };

//   export default OAuthCallback;
