import createDataContext from './createDataContext';
import spotifyAPI from '../api/spotifyAPI';
import { AuthSession } from 'expo';
import { encode as btoa } from 'base-64';
import { AsyncStorage } from 'react-native';

import secrets from '../../secrets';

const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                   'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                   'playlist-modify-private','user-read-recently-played','user-top-read'];

const scopes = scopesArr.join(' ');

const spotifyReducer = (state, action) => {

    switch(action.type) {

        case 'add_playlists': return { ...state, playlists: action.payload };
        case 'get_current_track': return { ...state, currentTrack: action.payload };
        case 'pause': return { ...state, trackPlaying: false };
        case 'play': return { ...state, trackPlaying: true };
        case 'search': return { ...state, searchResults: action.payload };
        case 'init_playstate': return { ...state, trackPlaying: action.payload };
        case 'skip': return { ...state, trackPlaying: true, currentTrack: action.payload };
        case 'set_device': return { ...state, activeDevice: action.payload };
        case 'get_devices': return { ...state, availDevices: action.payload }
        default: return state;

    };

};

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

const getTokens = async () => {

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

        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        await AsyncStorage.setItem('expirationTime', expirationTime);

    } catch (err) {
        console.error(err);
    }
}

const refreshTokens = async () => {

    try {
        const credentials = await getSpotifyCredentials()
        const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
        const refreshToken = await AsyncStorage.getItem('refreshToken');
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
            await AsyncStorage.setItem('accessToken', newAccessToken);
            if (newRefreshToken) {
                await AsyncStorage.setItem('refreshToken', newRefreshToken);
            }
            await AsyncStorage.setItem('expirationTime', expirationTime.toString());

        }
        
    } catch (err) {
        console.error(err);
    }
}

const getCurrentTrack = dispatch => async () => {

    const tokenExpirationTime = await AsyncStorage.getItem('expirationTime');
    if (!tokenExpirationTime || new Date().getTime() > parseFloat(tokenExpirationTime)) {
        await refreshTokens();
    }

    try{

        const currentTrack = await spotifyAPI.get('/me/player/currently-playing');
        const trackData = {title: currentTrack.data.item.name, 
            artists: currentTrack.data.item.artists[0], 
            duration: currentTrack.data.item.duration_ms,
            image: currentTrack.data.item.album.images[1]}
        // console.log(trackData)
        dispatch({ type: 'get_current_track', payload: trackData });

    } catch (err) {
        console.log(err)
    }
};

const resumePlayback = dispatch => async () => {

    const tokenExpirationTime = await AsyncStorage.getItem('expirationTime');
    if (!tokenExpirationTime || new Date().getTime() > parseFloat(tokenExpirationTime)) {
        await refreshTokens();
    }

    try{
        await spotifyAPI.put('/me/player/play');
        dispatch({ type: 'play' });
    } catch (err) {
        console.log(err)
    }
};

const pausePlayback = dispatch => async () => {

    const tokenExpirationTime = await AsyncStorage.getItem('expirationTime');
    if (!tokenExpirationTime || new Date().getTime() > parseFloat(tokenExpirationTime)) {
        await refreshTokens();
    }

    try{
        await spotifyAPI.put('/me/player/pause');
        dispatch({ type: 'pause' });
    } catch (err) {
        console.log(err)
    }
};

const skipSong = dispatch => async () => {

    const tokenExpirationTime = await AsyncStorage.getItem('expirationTime');
    if (!tokenExpirationTime || new Date().getTime() > parseFloat(tokenExpirationTime)) {
        await refreshTokens();
    }

    try{
        await spotifyAPI.post('/me/player/next');
        const currentTrack = await spotifyAPI.get('/me/player/currently-playing');
        const trackData = {title: currentTrack.data.item.name, 
            artists: currentTrack.data.item.artists[0], 
            duration: currentTrack.data.item.duration_ms,
            image: currentTrack.data.item.album.images[1]}
        dispatch({ type: 'skip', payload: trackData });
    } catch (err) {
        console.log(err)
    }
};

const getPlayState = dispatch => async () => {

    const tokenExpirationTime = await AsyncStorage.getItem('expirationTime');
    if (!tokenExpirationTime || new Date().getTime() > parseFloat(tokenExpirationTime)) {
        await refreshTokens();
    }

    try{
        const playState = await spotifyAPI.get('/me/player');
        const playing = playState.data.is_playing;
        const device = playState.data.device.name;
        dispatch({ type: 'init_playstate', payload: playing});
        dispatch({ type: 'set_device', payload: device})
    } catch (err) {
        console.log(err)
    }
};

const searchSongs = dispatch => async (q) => {

    const tokenExpirationTime = await AsyncStorage.getItem('expirationTime');
    if (!tokenExpirationTime || new Date().getTime() > parseFloat(tokenExpirationTime)) {
        await refreshTokens();
    }

    try{
        const query = encodeURIComponent(q);
        const searchRes = await spotifyAPI.get(`/search?q=${query}&type=track&limit=10`);
        dispatch({ type: 'search', payload: searchRes.data.tracks.items});
    } catch (err) {
        console.log(err)
    }
};

const getAvailableDevices = dispatch => async () => {

    const tokenExpirationTime = await AsyncStorage.getItem('expirationTime');
    if (!tokenExpirationTime || new Date().getTime() > parseFloat(tokenExpirationTime)) {
        await refreshTokens();
    }

    try{
        const devices = await spotifyAPI.get('/me/player/devices');
        dispatch({ type: 'get_devices', payload: devices.data.devices});
    } catch (err) {
        console.log(err)
    }

};

const setDevice = dispatch => async (device_id, device_name) => {

    const tokenExpirationTime = await AsyncStorage.getItem('expirationTime');
    if (!tokenExpirationTime || new Date().getTime() > parseFloat(tokenExpirationTime)) {
        await refreshTokens();
    }

    try{

        await spotifyAPI.put('/me/player', {
            "device_ids": [
              `${device_id}`
            ],
            "play": true
        });
        
        dispatch({ type: 'set_device', payload: device_name});

    } catch (err) {
        
        console.log(err)
    }
    
};

export const { Context, Provider } = createDataContext(
    spotifyReducer, 
    { refreshTokens, getCurrentTrack, skipSong, pausePlayback, resumePlayback, getPlayState, searchSongs, getAvailableDevices, setDevice },
    { trackPlaying: false, playlists: [], currentTrack: null, searchResults: [], availDevices: [], activeDevice: null }
);