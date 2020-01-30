import React, { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import { EvilIcons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-navigation';
import { Context as SpotifyContext } from '../context/SpotifyContext';
import { Context as RoomContext } from '../context/RoomContext';

const SearchScreen = () => {

    const { state: { searchResults }, searchSongs } = useContext(SpotifyContext);
    const { queueSong } = useContext(RoomContext);
    const [ search, setSearch ] = useState('');

    return (
        <SafeAreaView style={styles.containerStyle} forceInset={{ top: 'always' }}>
            <View style={styles.backgroundStyle}>
                <EvilIcons name="search" style={styles.iconStyle} />
                <TextInput 
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={search} 
                    onChangeText={setSearch}
                    style={styles.inputStyle} 
                    placeholder='Search'/>
            </View>
            <TouchableOpacity 
                    onPress={() => searchSongs(search)}
                    style={styles.buttonStyle} >
                        <Text style={styles.inputTextStyle}>Search</Text>
            </TouchableOpacity>  
            <FlatList
                data={searchResults}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => queueSong(item)}>
                            <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 8 }}>
                                <Image
                                    style={{ width: 40, height: 40 }}
                                    source={{uri: item.album.images[0].url}}
                                    />
                                <View style={{ marginLeft: 15, marginRight: 75 }} >
                                    <Text numberOfLines={1} style={styles.trackName} >{item.name}</Text>
                                    <Text numberOfLines={1} style={styles.artistName} >{item.artists[0].name}</Text>
                                </View>
                                <Feather name="plus" style={{ color: 'white', fontSize: 20, position: 'absolute', right: 0, alignSelf: 'center' }} />
                            </View>
                        </TouchableOpacity>
                    );
                }}/>   
        </SafeAreaView>
    );

};

SearchScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#181818'
    },
    textStyle: {
        fontSize: 20,
        padding: 14,
        color: 'white'
    },
    backgroundStyle: {
        marginTop: 15,
        backgroundColor: "#f0eeee",
        height: 50,
        borderRadius: 10,
        marginHorizontal: 20,
        flexDirection: "row",
        marginBottom: 12
    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 38,
        alignSelf: 'center',
        marginHorizontal: 10
    },
    buttonStyle: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        fontSize: 20,
        marginBottom: 15,
        marginHorizontal: 100
    },
    inputTextStyle: {
        textAlign: 'center',
        fontSize: 22,
        color: 'white',
        marginVertical: 17
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
    }

});

export default SearchScreen;