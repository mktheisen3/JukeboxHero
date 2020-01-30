import createDataContext from './createDataContext';
import jukeboxHeroAPI from '../api/jukeboxHeroAPI';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef';

const roomReducer = (state, action) => {

    switch(action.type) {

        case 'setup_room': return { ...state, roomName: action.payload.name, roomCode: action.payload.code };
        case 'queue_song': return { ...state, queue: [ ...state.queue, action.payload ] }
        default: return state;

    };

};

const queueSong = dispatch => async (songItem) => {
    dispatch({ type: 'queue_song', payload: songItem});
};

const removeSong = dispatch => async () => {

};

const setRoomDetails = dispatch => async (code, name) => {
    console.log(code, name)
    dispatch({ type: 'setup_room', payload: { code, name } });
};

export const { Context, Provider } = createDataContext(
    roomReducer, 
    { queueSong, setRoomDetails },
    { roomCode: null, roomName: null, queue: [], members: [] }
);