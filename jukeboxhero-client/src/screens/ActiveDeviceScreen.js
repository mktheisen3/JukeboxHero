import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Context as SpotifyContext } from '../context/SpotifyContext';
import { NavigationEvents } from 'react-navigation';

const ActiveDeviceScreen = () => {

    const { state: { availDevices, activeDevice }, getAvailableDevices, setDevice, getPlayState } = useContext(SpotifyContext);

    return (
        <View style={styles.containerStyle} >
            <NavigationEvents onWillFocus={getPlayState}/>
            <NavigationEvents onWillFocus={getAvailableDevices}/>  
            <Text style={styles.textStyle} >Active Device:</Text>
            {activeDevice ? <Text style={styles.activeStyle} >{activeDevice}</Text> : null}
            <Text style={styles.textStyle} >Available Devices:</Text>
            <FlatList 
                data={availDevices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => setDevice(item.id, item.name)}>
                            <Text style={styles.deviceStyle} >{item.name}</Text>
                        </TouchableOpacity>
                    );
                }}/>
        </View>
    );

};

ActiveDeviceScreen.navigationOptions = {
    title: "Device Options",
    headerTitleStyle: {
        color: 'white'
    },
    headerStyle: {
        backgroundColor: '#181818',
        borderBottomWidth: 0,
        marginTop: 10
    },
    headerTintColor: '#696969'
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
    buttonStyle: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        fontSize: 20,
        marginBottom: 15,
        marginHorizontal: 100
    },
    textStyle: {
        marginLeft: 20,
        fontSize: 22,
        color: 'white',
        marginVertical: 17
    },
    deviceStyle: {
        fontSize: 15,
        color: 'white',
        marginVertical: 15,
        marginHorizontal: 20
    },
    activeStyle: {
        fontSize: 15,
        color: '#228B22',
        marginVertical: 15,
        marginHorizontal: 20
    }
});

export default ActiveDeviceScreen;