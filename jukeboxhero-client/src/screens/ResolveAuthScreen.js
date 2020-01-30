import { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as SpotifyContext } from '../context/SpotifyContext';
import { AsyncStorage } from 'react-native';

const ResolveAuthScreen = () => {

    const { tryLocalSignin } = useContext(AuthContext);
    const { refreshTokens } = useContext(SpotifyContext);

    async function refreshTheFuckingToken() {
        const tokenExpirationTime = await AsyncStorage.getItem('expirationTime');
        if (!tokenExpirationTime || new Date().getTime() > parseFloat(tokenExpirationTime)) {
            await refreshTokens;
        }
    }

    useEffect(() => {

        tryLocalSignin();
        refreshTheFuckingToken();
        
    }, []);

    return null;

};

export default ResolveAuthScreen;