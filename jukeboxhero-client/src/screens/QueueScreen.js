import React, { useContext } from 'react';
import { StyleSheet, FlatList, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Context as RoomContext } from '../context/RoomContext';
import { Context as SpotifyContext } from '../context/SpotifyContext';

const QueueScreen = () => {

    const { state: { queue } } = useContext(RoomContext);
    const { state: { currentTrack } } = useContext(SpotifyContext);

    return (
        <SafeAreaView style={styles.containerStyle} forceInset={{ top: 'always' }}>
            <Text style={styles.titleStyle} >Now Playing</Text>
            <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 8, marginBottom: 20 }}>
                <Image
                    style={{ width: 40, height: 40 }}
                    source={{uri: currentTrack.image.url}}
                    />
                <View style={{ marginLeft: 15, marginRight: 40 }} >
                    <Text numberOfLines={1} style={styles.trackName} >{currentTrack.title}</Text>
                    <Text numberOfLines={1} style={styles.artistName} >{currentTrack.artists.name}</Text>
                </View>
            </View>
            <Text style={styles.titleStyle} >Up Next</Text>
            <FlatList
                data={queue}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                    <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 8 }}>
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={{uri: item.album.images[0].url}}
                            />
                        <View style={{ marginLeft: 15, marginRight: 60 }} >
                            <Text numberOfLines={1} style={styles.trackName} >{item.name}</Text>
                            <Text numberOfLines={1} style={styles.artistName} >{item.artists[0].name}</Text>
                        </View>
                    </View>
                    );
                }}/> 
        </SafeAreaView>
    );

};

QueueScreen.navigationOptions = {
    title: "Queue",
    headerTitleStyle: {
        color: 'white'
    },
    headerStyle: {
        backgroundColor: '#181818',
        borderBottomWidth: 0,
        marginTop: 10
    }
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#181818'
    },
    trackName: {
        fontSize: 16,
        color: 'white',
        textAlign: 'left'
    },
    artistName: {
        fontSize: 12,
        paddingTop: 3,
        color: 'white',
        textAlign: 'left'
    },
    titleStyle: {
        marginHorizontal: 20,
        marginBottom: 10,
        fontSize: 18,
        color: 'white',
        textAlign: 'left',
        fontWeight: 'bold'
    }
});

export default QueueScreen;