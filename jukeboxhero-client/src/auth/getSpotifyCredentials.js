
import axios from 'axios'

const getSpotifyCredentials = async () => {
    const res = await axios.get('/api/spotify-credentials')
    const spotifyCredentials = res.data
    return spotifyCredentials
};