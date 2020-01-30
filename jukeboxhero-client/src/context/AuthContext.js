import createDataContext from './createDataContext';
import jukeboxHeroAPI from '../api/jukeboxHeroAPI';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {

    switch(action.type) {

        case 'add_error': return { ...state, errorMessage: action.payload };
        case 'signin': return { ...state, token: action.payload, errorMessage: '' };
        case 'signout': return { ...state, token: null, errorMessage: '', isHost: false };
        case 'clear_error': return { ...state, errorMessage: '' };
        case 'become_host': return { ...state, isHost: true };
        case 'become_not_host': return { ...state, isHost: false };
        default: return state;

    };

};

const clearErrMessage = dispatch => () => { 
    dispatch({ type: 'clear_error' });
}

const tryLocalSignin = dispatch => async () => {

    const token = await AsyncStorage.getItem('token');

    if (token) {
        dispatch({ type: 'signin', payload: token });
        navigate('initialFlow');
    } else {
        navigate('loginFlow');
    }

}

const signup = dispatch =>  async ({ email, password }) => { 
    try {

        const response = await jukeboxHeroAPI.post('/signup', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });
        navigate('initialFlow');

    } catch (err) {
        
        dispatch({ type: 'add_error', payload: 'Something went wrong with signup' });

    }
};


const signin = dispatch => async ({ email, password }) => { 
    try {

        const response = await jukeboxHeroAPI.post('/signin', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });
        navigate('initialFlow');

    } catch (err) {

        dispatch({ type: 'add_error', payload: 'Something went wrong with signin' });

    }
};

const signout = dispatch => async () => {

    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('loginFlow');

};

const becomeHost = dispatch => async () => {

    dispatch({ type: 'become_host' });
    console.log('becamehost');
    navigate('NowPlaying');

};

const becomeNotHost = dispatch => async () => {

    dispatch({ type: 'become_not_host' });
    navigate('Index');

};

export const { Context, Provider } = createDataContext(
    authReducer, 
    { signup, signin, signout, clearErrMessage, tryLocalSignin, becomeHost, becomeNotHost },
    { token: null, errorMessage: '', isHost: false }
);