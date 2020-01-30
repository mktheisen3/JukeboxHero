import { AuthSession } from 'expo';
import { encode as btoa } from 'base-64';

// import axios from 'axios';

import secrets from '../../secrets';

const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                   'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                   'playlist-modify-private','user-read-recently-played','user-top-read'];

const scopes = scopesArr.join(' ');

const userData = {
    accessToken: '',
    refreshToken: '',
    expirationTime: ''
};

// const getSpotifyCredentials = async () => {
//     const res = await axios.get('/api/spotify-credentials')
//     const spotifyCredentials = res.data
//     return spotifyCredentials
// };

const getSpotifyCredentials = () => {
        const spotifyCredentials = secrets;
        return spotifyCredentials
};

const getAuthorizationCode = async () => {
    let result = '';
    try {
        const credentials = await getSpotifyCredentials();
        const redirectUrl = AuthSession.getRedirectUrl();
        result = await AuthSession.startAsync({
            authUrl: 'https://accounts.spotify.com/authorize' + '?response_type=code' + '&client_id=' +
            credentials.clientId + (scopes ? '&scope=' + encodeURIComponent(scopes) : '') + '&redirect_uri=' +
            encodeURIComponent(redirectUrl)
        });
    } catch (err) {
        console.error(err);
    }    
    return result.params.code;
}

export const getTokens = async () => {

    try {
        const authorizationCode = await getAuthorizationCode() 
        const credentials = await getSpotifyCredentials() 
        const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credsB64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
                credentials.redirectUri
            }`,
        });
        const responseJson = await response.json();
        const {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: expiresIn,
        } = responseJson;

        const expirationTime = new Date().getTime() + expiresIn * 1000;
        // await setUserData('accessToken', accessToken);
        // await setUserData('refreshToken', refreshToken);
        // await setUserData('expirationTime', expirationTime);
        userData.accessToken = accessToken;
        userData.refreshToken = refreshToken;
        userData.expirationTime = expirationTime;

        console.log("FROM GET TOKENS", userData);

    } catch (err) {
        console.error(err);
    }
}

export const refreshTokens = async () => {

    try {
        // await getTokens();
        const credentials = await getSpotifyCredentials()
        const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
        // const refreshToken = await getUserData('refreshToken');
        const refreshToken = await userData.refreshToken;
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credsB64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
        });
        const responseJson = await response.json();
        if (responseJson.error) {
            await getTokens();
        } else {
            const {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
                expires_in: expiresIn,
            } = responseJson;
    
            const expirationTime = new Date().getTime() + expiresIn * 1000;
            // await setUserData('accessToken', newAccessToken);
            userData.accessToken = newAccessToken;
            if (newRefreshToken) {
                // await setUserData('accessToken', newAccessToken);
                userData.refreshToken = newRefreshToken;
            }
            // await setUserData('expirationTime', expirationTime);
            userData.expirationTime = expirationTime;

            console.log("FROM REFRESH TOKENS", userData);

        }
    } catch (err) {
        console.error(err);
    }
}