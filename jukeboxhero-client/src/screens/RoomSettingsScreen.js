import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';

const RoomSettingsScreen = () => {

    return (
        <SafeAreaView style={styles.containerStyle} forceInset={{ top: 'always' }}>
            
        </SafeAreaView>
    );

};

RoomSettingsScreen.navigationOptions = {
    title: "Room Settings",
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
        color: 'white',
        textAlign: 'center',
        padding: 18
    }
});

export default RoomSettingsScreen;