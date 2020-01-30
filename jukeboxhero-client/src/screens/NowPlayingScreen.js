import React, { useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { Context as SpotifyContext } from '../context/SpotifyContext';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

const NowPlayingScreen = () => {

    const { state: { currentTrack, trackPlaying }, getPlayState, getCurrentTrack, skipSong, pausePlayback, resumePlayback } = useContext(SpotifyContext);
    const { state: { isHost } } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.containerStyle} forceInset={{ top: 'always' }}>

            <NavigationEvents onWillFocus={getPlayState}/>
            <NavigationEvents onWillFocus={getCurrentTrack}/>
            
            {currentTrack ? 
                <View>
                    <Image
                        style={styles.imageStyle}
                        source={{uri: currentTrack.image.url}}
                        />
                    <Text style={styles.trackName} >{currentTrack.title}</Text>
                    <Text style={styles.artistName} >{currentTrack.artists.name}</Text>
                </View> : null}
            { isHost ? 
                <View style={styles.navContainer}>
                    {trackPlaying ? 
                        <TouchableOpacity onPress={pausePlayback} style={{paddingRight: 15}}>
                                <MaterialIcons name="pause" size={50} color='white'/>
                        </TouchableOpacity> : 
                        <TouchableOpacity onPress={resumePlayback} style={{paddingRight: 15}}>
                            <MaterialIcons name="play-arrow" size={50} color='white'/>
                        </TouchableOpacity>
                    } 
                    <TouchableOpacity onPress={skipSong} style={{paddingLeft: 15}}>
                            <MaterialIcons name="skip-next" size={50} color='white'/>
                    </TouchableOpacity>
                </View>
                
                : null }   
        </SafeAreaView>
    );

};

NowPlayingScreen.navigationOptions = () => {

    return {
        title: "Playing",
        headerTitleStyle: {
            color: 'white'
        },
        headerStyle: {
            backgroundColor: '#181818',
            borderBottomWidth: 0,
            marginTop: 10
        }
    };

};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#181818',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50
    },
    textStyle: {
        fontSize: 20,
        padding: 18,
        color: 'white',
        textAlign: 'center'
    },
    trackName: {
        fontSize: 20,
        paddingTop: 20,
        color: 'white',
        textAlign: 'left'
    },
    artistName: {
        fontSize: 15,
        paddingTop: 10,
        color: 'white',
        textAlign: 'left'
    },
    imageStyle: {
        width: 300,
        height: 300
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    }
});

export default NowPlayingScreen;

// ,
//         headerRight: (
//             <TouchableOpacity
//                 onPress={() => navigation.navigate(nextScreen)}
//                 style={{ paddingRight: 15 }}>
//                 <Ionicons name="ios-settings" size={25} color='white' />
//             </TouchableOpacity>
//         )