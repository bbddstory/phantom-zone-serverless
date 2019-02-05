import {
  CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails
} from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
import axios from 'axios';
import {
  TOGGLE_LOADER,
} from './uiActions';
import {
  secretHash, POOL_DATA, NODE_URL
} from '../util/utils';

// Action types
export const LOGIN = 'LOGIN';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_FRIENDS = 'SET_FRIENDS';

// Action creators
export function registerAct(form) {
  return (dispatch, getState) => {
    let dynamodb = new AWS.DynamoDB();
    let params = {
      Key: {
        "imdb": {
         S: "tt1979376"
        },
        "engTitle": {
          S: ""
        },
        "origTitle": {
          S: ""
        }
      }, 
      TableName: "videos"
     };
     dynamodb.getItem(params, function(err, data) {
       if (err) console.log(err, err.stack); // an error occurred
       else     console.log(data);           // successful response
    });

    // let params = {
    //   Item: {
    //    "imdb": {
    //      S: "tt7520794"
    //     }, 
    //    "engTitle": {
    //      S: "Russian Doll"
    //     }, 
    //    "origTitle": {
    //      S: "Russian Doll"
    //     }
    //   }, 
    //   ReturnConsumedCapacity: "TOTAL", 
    //   TableName: "videos"
    // };
    // dynamodb.putItem(params, function(err, data) {
    //   if (err) console.log(err, err.stack); // an error occurred
    //   else     console.log(data);           // successful response
    // });

    // dispatch({ type: TOGGLE_LOADER, status: true, loaderTxt: 'Registering...' });
    // let cogUser = new CognitoUser(POOL_DATA);
    // https://www.npmjs.com/package/amazon-cognito-identity-js
    // cogUser.

    // let userPool = new CognitoUserPool(POOL_DATA);
    // let attributeList = [];
    // let dataEmail = {
    //   Name: 'email',
    //   Value: 'bbddstory@live.com'
    // };
    // let dataNickname = {
    //   Name: 'nickname',
    //   Value: 'bbddstory'
    // };
    // let attributeEmail = new CognitoUserAttribute(dataEmail);
    // let attributeNickname = new CognitoUserAttribute(dataNickname);

    // attributeList.push(attributeEmail);
    // attributeList.push(attributeNickname);

    // userPool.signUp('bbddstory@live.com', 'p4WE7twur6ZQ', attributeList, null, (err, result) => {
    //   if (err) {
    //     alert(err);
    //     return;
    //   };
    //   let cognitoUser = result.user;
    //   console.log('User name is: ' + cognitoUser.getUsername());
    // }, );

    // axios.post(`${NODE_URL()}/users/register`, form).then((res) => {
    //   if (res.status === 201) {
    //     dispatch({
    //       type: SET_TOKEN,
    //       token: res.data.token,
    //       email: form.email,
    //       user: form.firstName,
    //     });
    //     dispatch({ type: TOGGLE_LOADER, status: false });

    //     window.location.hash = '#/main/home';
    //   }
    // }).catch(err => console.log(err));
  };
}

export function loginAct(form) {
  return (dispatch, getState) => {
    let authenticationData = {
      Username: 'bbddstory@live.com',
      Password: 'p4WE7twur6ZQ',
    };
    let authenticationDetails = new AuthenticationDetails(authenticationData);
    let userPool = new CognitoUserPool(POOL_DATA);
    let userData = {
      Username: 'bbddstory@live.com',
      Pool: userPool
    };
    let cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        // console.log(result);
        
        let accessToken = result.getAccessToken().getJwtToken();
        console.log(accessToken);

        //POTENTIAL: Region needs to be set if not already set previously elsewhere.
        AWS.config.region = 'ap-southeast-2';

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'ap-southeast-2:81574ee8-a977-4ade-81cd-8f4695e3fd4d', // your identity pool id here
          Logins: {
            // Change the key below according to the specific region your user pool is in.
            'cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_buqOHHVyi': result.getIdToken().getJwtToken()
          }
        });

        AWS.config.apiVersions = {
          dynamodb: '2012-08-10',
          // other service API versions
        };

        //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
        // AWS.config.credentials.refresh((error) => {
        //   if (error) {
        //     console.error(error);
        //   } else {
        //     // Instantiate aws sdk service objects now that the credentials have been updated.
        //     // example: var s3 = new AWS.S3();
        //     console.log('Successfully logged!');

        //     // cognitoUser.deleteUser(function(err, result) {
        //     //   if (err) {
        //     //       alert(err.message || JSON.stringify(err));
        //     //       return;
        //     //   }
        //     //   console.log('Call result: ' + result);
        //     // });
        //   }
        // });
      },

      onFailure: function (err) {
        alert(err.message || JSON.stringify(err));
      },

    });

    // dispatch({ type: TOGGLE_LOADER, status: true, loaderTxt: 'Signing in...' });

    // axios.post(`${NODE_URL()}/users/login`, form).then((res) => {
    //   if (res.status === 200) {
    //     dispatch({
    //       type: SET_TOKEN,
    //       token: res.data.token,
    //       email: form.email,
    //       user: res.data.user,
    //       friends: res.data.friends,
    //     });
    //     dispatch({ type: TOGGLE_LOADER, status: false });
    //     document.cookie = `token=${res.data.token}`;
    //     document.cookie = `email=${form.email}`;
    //     document.cookie = `user=${res.data.user}`;

    //     window.location.hash = '#/main/home';
    //   }
    // }).catch(err => console.log(err));
  };
}

export function setTokenAct(token, email, user) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_TOKEN,
      token,
      email,
      user
    });
  };
}

export function friendsAct(token, email) {
  return (dispatch, getState) => {
    axios.post(`${NODE_URL()}/users/friends`, {
      token,
      email
    }).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: SET_FRIENDS,
          friends: res.data.friends
        });
      }
    }).catch(err => console.log(err));
  };
}